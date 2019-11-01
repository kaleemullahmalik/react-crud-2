let mongoose = require('mongoose');

//User Schema
let userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('users',userSchema);