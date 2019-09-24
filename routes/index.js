const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const { ensureAuthenticated } = require('../config/auth');

// // Welcome Page
// router.get('/', (req, res) => res.redirect('/'));

// // Login Page
// router.get('/login', (req, res) => res.redirect('/login'));

// // Register Page
// router.get('/register', (req, res) => res.redirect('/register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.send(errors);
  }

  else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.send(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.send("no register error");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// // passport: Login
router.post('/login', (req, res, next) => {
  // console.log(req.body)
  passport.authenticate('local', {
    successRedirect: '/logged',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// // passport: use req.user instead of using req.body
router.get('/logged', ensureAuthenticated, (req, res) => {
  // console.log(req.user)
  const user = {
    userData: req.user
  }
  res.json(user);
  // res.redirect('/profile')
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json(req.user);
}

// // passport: Login
// router.post('/login',
//   passport.authenticate('local'),
//   function (req, res) {
//     console.log(req.user._id);
//     res.redirect('/profile/' + req.user._id);
//     // res.redirect('/profile');
//   });

// // API findUser
// router.route('/findUser/:id')
//   .get(Controller.findUser);


// // passport: Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send("passport logged out");
  // res.redirect('/');
});

module.exports = router;
