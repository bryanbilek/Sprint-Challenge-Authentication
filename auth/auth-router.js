const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model');
const secrets = require('../secrets');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
      .then(user => {
        console.log("REGISTER", user);
          res.status(201).json({ message: 'Registration successful' });
      })
      .catch(err => {
          res.status(500).json({ message: 'Registraition failed' });
      });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
      .then(([user]) => {
        console.log("LOGIN", user);
          if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user);
              res.status(201).json({ message: `Welcome, ${token}!` });
          } else {
              res.status(401).json({ message: 'Invalid username or password' })
          }
      })
      .catch(err => {
          res.status(500).json({ message: 'Problem logging in' });
      });
});

//token
function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    };
    const secret = secrets.jwtSecret
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options);
};

module.exports = router;
