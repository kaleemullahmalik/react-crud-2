import React, { Component } from 'react';
import axios from 'axios';

class AddUser extends Component {

    render(){
        return(

          <div className="container">

    <h1 className="text-center"><b>Add User </b></h1>
                <UserForm />
            </div>
        );
        
    }
}

class UserForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            age:'',
            nameErr:'',
            ageErr:'',
            successMsg:false
        };
    
    }

    handleNameChange = e => {
        this.setState({name:e.target.value});
    }

    handleAgeChange = e => {
        this.setState({age:e.target.value});
    }

    handleSuccessMsg = () => {
        this.setState({successMsg:false});
    }

    handleForm = () => {

        if(this.state.name===''){
            this.setState({nameErr:'Name is Required'});
        }else{
            this.setState({nameErr:''});
        }

        if(this.state.age===''){
            this.setState({ageErr:'Age is Required'});
        }else{
            this.setState({ageErr:''});
        }

        //Saving Data to DB via POST request to API
        if(this.state.name!=='' && this.state.age!==''){
            const user = {
                username:this.state.name,
                age:this.state.age
            }
            axios({
                method: 'post',
                url: 'http://localhost:4000/addUser',
                data: user,
            }).then(response => {
                if(response.status===200){
                    this.setState({name:'',age:'',successMsg:true});
                }
            });
        }
        
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label >Name:</label>
                    <input type="text" className="form-control" placeholder="Enter your name" value={this.state.name} onChange={this.handleNameChange}></input>
                </div>
                <span className="text-danger">{this.state.nameErr}</span>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" className="form-control" placeholder="Enter your age" value={this.state.age} onChange={this.handleAgeChange}></input>
                </div>
                <span className="text-danger">{this.state.ageErr}</span>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.handleForm}>Submit</button>
                </div>
                <SuccessMsg successMsg={this.state.successMsg} handler={this.handleSuccessMsg}/>   
                
            </div>
        );
    }
}

class SuccessMsg extends Component {
    render(){
        if(this.props.successMsg){
        
            return (
                <div className="alert">
                    <p className="close" onClick={this.props.handler}>&times;</p>
                    <strong>Success!</strong> User has been added Successfully.
                </div>
            );
        }
        else{
            return null;
        }
    }
}

export default AddUser;