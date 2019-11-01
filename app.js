const express = require('express');
const port = process.env.PORT || 4000;
const path = require('path');
const cors = require('cors'); 
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.json());

//Importing Routes
require('./config/routes')(app);

mongoose.connect('mongodb://localhost/api');
let db = mongoose.connection;

db.on('error',function(err){
    if(err){
        console.log(err);
    }
});
db.once('open',function(){
    console.log('DB Connected Successfully');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Server started on port '+port);
});