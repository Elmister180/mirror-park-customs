const passport = require('passport');
const localstrategy = require('passport-local').Strategy;

const User = require('../models/user');


// serializacion y deserializacion //

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);
   done(null, user);
});


// registro //



passport.use('local-register', new localstrategy ({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {

    const user = await User.findOne({username: username});
    if (user) {
        return done(null, false, req.flash('registererror', 'Este usuario ya exixte'));
    } else{    
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password); 
        await newUser.save();
        done(null, newUser);
    }
    
}))


// login //


passport.use('local-login', new localstrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
   const user = await User.findOne({username: username});
   if(!user) {
        return done(null, false, req.flash('usernameerror', 'el usuario que a introducido no es correcto'));
   }
   if(!user.comparePassword(password)) {
       return done(null, false, req.flash('passworderror', 'la contraseña es erronea, intentelo de nuevo'));
   }
   return done(null, user);
}));