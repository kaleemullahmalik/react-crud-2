let User = require('../models/user');
const mongoose =  require('mongoose');

//Homepage
exports.Index = function(req,res){
    res.render('index');
}

//Get Users
exports.getUser = (req,res) => {
    User.find({},function(err,users){
        if(err){
            console.log(err);
        }
        res.json(users);
    });
}

//Get Users By ID
exports.getUserById = (req,res) => {
    let userId = req.params._id;

    if(mongoose.Types.ObjectId.isValid(userId)){
        User.findById(userId,function(err,users){
            if(err){
                console.log(err);
            }
            res.json(users);
        });
    }else{
        res.json(null);
    }

    
}

//Add new Users
exports.addUser = (req,res) => {
    var user = new User(req.body);
    //Adding new User to DB
    user.save(function(err,user){
        if(err){
            console.log(err);
        }
        res.json(user);
        
    });
   
}

//Update users by Id
exports.updateUser = (req,res) => {
    var query = {_id:req.params._id};
    var updatedUser = req.body;
    if(mongoose.Types.ObjectId.isValid(req.params._id)){
        User.findOneAndUpdate(query, updatedUser, {upsert:true}, function(err, user){
            if (err) console.log(err);
            res.json(user);
        });
    }else{
        res.json(null);
    }
    
}

//Delete Users By ID
exports.deleteUser = (req,res) => {
    var query = {_id:req.params._id};

    if(mongoose.Types.ObjectId.isValid(req.params._id)){
        User.deleteOne(query, function (err,user) {
            if (err) return handleError(err);
            res.json(user);
        });
    }else{
        res.json(null);
    }
}
