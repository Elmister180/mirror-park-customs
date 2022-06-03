const mongoose = require('mongoose');
const { db_login } = require('./config');
const {mongodb} = require('./keys');


mongoose.connect(db_login, {useNewUrlParser: true, useUnifiedTopology: true} )


.then(db => console.log('database is on'))

.catch(err => console.error(err));