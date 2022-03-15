const mongoose = require('mongoose');
const {mongodb} = require('./keys');


mongoose.connect(mongodb.URI, {useNewUrlParser: true, useUnifiedTopology: true} )


.then(db => console.log('database is on'))

.catch(err => console.error(err));