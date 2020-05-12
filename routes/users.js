var express = require("express");
var User = require("../models/user");
var passport = require("passport");
var authenticate = require("../authenticate");
const bodyParser = require("body-parser");

var router = express.Router();

/* Use body parser middleware for parsing incoming request */
router.use(bodyParser.json());

/* Return a list of all users when logged in as admin */
router.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    User.find({})
      .then(
        (users) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(users);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

/* Sign up a new user */
router.post("/signup", (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

/* Log in an existing user */
router.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
  });
});

/* Log out current user */
router.get("/logout", (req, res) => {
  jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  console.log(jwtFromRequest);
  // if (req.session) {
  //   req.session.destroy();
  //   res.clearCookie("session-id");
  //   res.redirect("/");
  // } else {
  //   var err = new Error("You are not logged in!");
  //   err.status = 403;
  //   next(err);
  // }
});

module.exports = router;
