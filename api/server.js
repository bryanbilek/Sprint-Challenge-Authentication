const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const dbConnection = require('../database/dbConfig');

const server = express();

const sessionConfig = {
    name: "SeCrEt",
    secret: process.env.SESSION_SECRET || "scottiepippen",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 60 * 60, //good for 1 hr
      secure: process.env.USE_SECURE_COOKIES || false,
      httpOnly: true,
    },
    store: new KnexSessionStore({
      knex: dbConnection,
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60, // will remove expired sessions every hour
    }),
  };

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
