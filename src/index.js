// module require //
const express = require('express');
const session = require('express-session') 
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const flash = require ('connect-flash');

// initializations //
const app = express();
require('./database')
require('./passport/local-auth');



// settings //
app.set('port', process.env.port || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// midelware //
app.use(morgan('dev'));
app.use(session({
    secret: 'mysesion',
    resave: false,
    saveUninitialized: false 
}));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, rep, next) => {
    app.locals.registererror = req.flash('registererror');
    app.locals.usernameerror = req.flash('usernameerror');
    app.locals.passworderror = req.flash('passworderror');
    next();
});

// routes //
app.use(require('./routes'));

// static files //

app.use(express.static (path.join(__dirname, 'public')));

// app listenig // 
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

