var UserController =  require('../controllers/UserController.js');

module.exports = function(app){

    app.get('/',UserController.Index);
    app.get('/getUser',UserController.getUser);
    app.get('/getUser/:_id',UserController.getUserById);
    app.post('/addUser',UserController.addUser);
    app.put('/updateUser/:_id',UserController.updateUser);
    app.delete('/deleteUser/:_id',UserController.deleteUser);
    
}