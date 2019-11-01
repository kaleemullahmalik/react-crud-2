import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import AddUser from './Components/AddUser';
import ViewUser from './Components/ViewUser';
import UpdateUser from './Components/UpdateUser';
import DeleteUser from './Components/DeleteUser';

class App extends Component {

 
  render() {

    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/addUser" component={AddUser} />
          <Route path="/viewUser" component={ViewUser} />
          <Route path="/updateUser" component={UpdateUser} />
          <Route path="/DeleteUser" component={DeleteUser} />
        </div>
      </Router>    
    );
  }
}

class Home extends Component {

  render() {
    return (
      <div className="container">
    <h1 className="text-center"><b>Admin Panel </b></h1>

                
        <Buttons />
      </div>
    );
  }
}

class Buttons extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Link  className="btn btn-primary btn-lg btn-block" to="/addUser">Add User</Link><br />
        </div>
        <div className="col-md-12">
          <Link  className="btn btn-primary btn-lg btn-block" to="/viewUser" >View User</Link> <br />
        </div>
        <div className="col-md-12">
          <Link  className="btn btn-primary btn-lg btn-block" to="/updateUser" >Update User</Link> <br />
        </div>
        <div className="col-md-12">
          <Link  className="btn btn-primary btn-lg btn-block" to="/deleteUser" >Delete User</Link> <br />
        </div>
      </div>
    );
  }
}


export default App;

