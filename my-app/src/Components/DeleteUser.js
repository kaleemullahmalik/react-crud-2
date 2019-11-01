import React, { Component } from 'react';
import axios from 'axios';

class DeleteUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            userId:'',
            userIdErr:'',
            successMsg:false
        };

    }

    handleUserIdChange = e => {
        this.setState({userId:e.target.value});
    }

    handleSuccessMsg = () => {
        this.setState({successMsg:false});
    }

    handleSearch = () => {
        if(this.state.userId===''){
            this.setState({userIdErr:'User Id is required.'});
        }

        if(this.state.userId!==''){

            const userId = this.state.userId;
            //Checking whether Searched User exist in DB or not
            axios({method: 'get',url: 'http://localhost:4000/getUser/'+userId,}).then(response => {
                
                if(response.status===200){
                    if(response.data!==null){

                        axios({method: 'delete',url: 'http://localhost:4000/deleteUser/'+userId,}).then(response => {
                
                            if(response.status===200){
                                this.setState({successMsg:true,userIdErr:''});
                            }
                        });

                    }
                    if(response.data===null){
                        this.setState({userIdErr:'User with this Id does not exist.'});
                    }
                }
            });
        }
        

    }


    render() {

        return(
            <div className="container">
                    <h1 className="text-center"> <b> Delete User </b></h1>
                
                <div className="form-group">
                    
                        <h2> <b> User ID: </b></h2>
                        <input type="text" className="form-control" placeholder="Enter User ID to delete User" value={this.state.userId} onChange={this.handleUserIdChange}></input>
                        <br />
                    
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.handleSearch}>Find & Delete</button>
                    
                </div>
                <span className="text-danger">{this.state.userIdErr}</span>
                <br />
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
                    <strong>Success!</strong> User has been Deleted Successfully.
                </div>
            );
        }
        else{
            return null;
        }
    }
}

export default DeleteUser;