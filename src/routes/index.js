const express = require("express");
const Router = express.Router();
const passport = require("passport");

// login //

Router.get("/", (req, res) => {
  res.render("login", { tittle: "mirror park customs" });
});

Router.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/home",
    failureRedirect: "/",
    passReqToCallback: true,
  })
);

/*
Router.use((req, res, next) =>{
    isAuthenticated(req, res, next);
    next();
});
*/

// area comun //

Router.get("/home", isAuthenticated, (req, res) => {
  res.render("home", { tittle: "mirror park customs" });
});

// area privada //

Router.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile", { tittle: "mirror park customs" });
});

// logout //

Router.get("/logout", isAuthenticated, (req, res, nex) => {
  req.logOut();
  res.redirect("/");
});

// administracion (adminpannel) //

Router.get("/adminpanel", isAuthenticated, (req, res) => {
  res.render("adminpanel", { tittle: "mirror park customs" });
});

// crear y gestionar usuarios //

Router.get("/userpanel", isAuthenticated, (req, res) => {
  res.render("userpanel", { tittle: "mirror park customs" });
});

Router.post(
  "/userpanel",
  isAuthenticated,
  passport.authenticate("local-register", {
    successRedirect: "/home",
    failureRedirect: "/userpanel",
    passReqToCallback: true,
  })
);

// adminitrar vehiculos //

Router.get("/vehiclepanel", isAuthenticated, (req, res) => {
  res.render("vehiclepanel", { tittle: "mirror park customs" });
});

// administrar la estadistica 77

Router.get("/statisticspanel", isAuthenticated, (req, res) => {
  res.render("estadistica", { tittle: "mirror park customs" });
});

// area para trabajadores //

Router.get("/app", isAuthenticated, (req, res) => {
  res.render("app", { tittle: "mirror park customs" });
});

Router.get("/jobpanel", isAuthenticated, (req, res) => {
  res.render("jobpanel", { tittle: "mirror park customs" });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = Router;

// partials //

/*

Router.get ('/footer', (req, res) => {
    res.render('partials/footer', { tittle: 'mirror park customs'});
});


Router.get ('/head', (req, res) => {
    res.render('partials/head', { tittle: 'mirror park customs'});
});
*/

/*
Router.post('/adminpanel', function(req, res, next) {
    passport.authenticate('local-register', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/adminpanel'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  });
*/

/*
Router.post('/', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/',
    passReqToCallback: true
}));*/

/*
Router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
})
*/
