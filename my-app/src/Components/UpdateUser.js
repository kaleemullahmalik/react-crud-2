import React, { Component } from 'react';
import axios from 'axios';

class UpdateUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            userId:'',
            userIdErr:'',
            update:false,
            userData:'',
            previousName:'',
            previousAge:''
        }
    }

    handleUserIdChange = e => {
        this.setState({userId:e.target.value});
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
                        this.setState({update:true,userData:response,previousName:response.data.username,previousAge:response.data.age,userIdErr:''});
                    }
                    if(response.data===null){
                        this.setState({update:false,userIdErr:'User with this Id does not exist.'});
                    }
                }
            });
        }
        

    }

    nameHandler = () => {
        this.setState({previousName:''});
    }

    ageHandler = () => {
        this.setState({previousAge:''});
    }


    componentDidMount() {
        document.title = 'Update User';
    }

    render() {

        return(
            <div className="container">
                
                    <h1 className="text-center"> <b>Update User </b></h1>
                     <div className="form-group">
                    
                        <h2> <b>User ID: </b> </h2>
                        <input type="text" className="form-control" placeholder="Enter User ID to update User" value={this.state.userId} onChange={this.handleUserIdChange}></input>
                    <br />
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.handleSearch}>Find & Update</button>
                    
                </div>
                <span className="text-danger">{this.state.userIdErr}</span>
                <br />

                <SearchedUser state={this.state} nameHandler={this.nameHandler} ageHandler={this.ageHandler} />

            </div>
        );
    }
}

class SearchedUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            updatedName:'',
            updatedAge:'',
            updatedNameErr:'',
            updatedAgeErr:'',
            successMsg:false
        };

    }

    handleNameChange = e => {
        this.setState({updatedName:e.target.value});
        this.props.nameHandler();
    }

    handleAgeChange = e => {
        this.setState({updatedAge:e.target.value});
        this.props.ageHandler();
    }

    handleSuccessMsg = () => {
        this.setState({successMsg:false});
    }

    handleUpdatedInputs = () => {
        //This is because updatedName & updateAge are empty if onChange of input fields are nor called
        if(this.props.state.previousName!==''){
            this.setState({updatedName:this.props.state.previousName});
            this.props.nameHandler();
        }
        if(this.props.state.previousAge!==''){
            this.setState({updatedAge:this.props.state.previousAge});
            this.props.ageHandler();
        }
    }

    handleUpdate = () => {

        if(this.state.updatedName===''){
            this.setState({updatedNameErr:'Name is Required.'});
        }
        if(this.state.updatedAge===''){
            this.setState({updatedAgeErr:'Age is Required.'});
        }
        if(this.state.updatedName!=='' && this.state.updatedAge!==''){

            const userData = {
                username:this.state.updatedName,
                age:this.state.updatedAge
            }
            const userId = this.props.state.userId;

            axios({ method: 'put',url: 'http://localhost:4000/updateUser/'+userId,data: userData,}).then(response => {
                
                if(response.status===200){
                    this.setState({updatedName:'',updatedAge:'',updatedNameErr:'',updatedAgeErr:'',successMsg:true});
                }
            });
        }
    }

    render(){

        if(this.props.state.update===true){

            return ( 
                <div>
                    
                    <div className="">

                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" value={this.state.updatedName==='' ? this.props.state.previousName:this.state.updatedName} placeholder="Enter Name" onChange={this.handleNameChange}></input>
                        </div>
                        <span className="text-danger">{this.state.updatedNameErr}</span>

                        <div className="form-group">
                            <label >Age:</label>
                            <input type="number" className="form-control" value={this.state.updatedAge==='' ? this.props.state.previousAge:this.state.updatedAge} placeholder="Enter age" onChange={this.handleAgeChange}></input>
                        </div>
                        <span className="text-danger">{this.state.updatedAgeErr}</span>

                        <div className="form-group">
                            <button className="btn btn-primary btn-lg btn-block" onClick={this.handleUpdate} onMouseMove={this.handleUpdatedInputs}>Update</button>
                        </div>

                    </div>
                    <SuccessMsg successMsg={this.state.successMsg} handler={this.handleSuccessMsg}/>
                </div>
            );  
        }
        else {
            return null;
        }
        
    }
}

class SuccessMsg extends Component {
    render(){
        if(this.props.successMsg){
        
            return (
                <div className="alert">
                    <p className="close" onClick={this.props.handler}>&times;</p>
                    <strong>Success!</strong> User has been Updated Successfully.
                </div>
            );
        }
        else{
            return null;
        }
    }
}


export default UpdateUser;