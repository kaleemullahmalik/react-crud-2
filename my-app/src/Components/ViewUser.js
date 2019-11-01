import React, { Component } from 'react';
import axios from 'axios';

class ViewUser extends  Component {

    constructor(props){
        super(props);
        this.state = {
            userId:'',
            userIdErr:'',
            noUserErr:'',
            getUsers:false,
            getUserById:false,
            userData:''
        }

    }

    handleViewAllUsers = () => {

        axios({method: 'get',url: 'http://localhost:4000/getUser',}).then(response => {
            if(response.status===200){
                
                if(response.data.length!==0){
                    this.setState({getUsers:true,getUserById:false,noUserErr:'',userData:response});
                }
                if(response.data.length===0){
                    this.setState({noUserErr:'No User exist in DB.'});
                }
            }
        });
        
    }

    handleUserIdChange = e => {
        this.setState({userId:e.target.value});
    }

    handleViewUserById = () => {
        if(this.state.userId===''){
            this.setState({userIdErr:'User Id is required'});  
        }
        if(this.state.userId!==''){
            const userId = this.state.userId;
            
            axios({method: 'get',url: 'http://localhost:4000/getUser/'+userId,}).then(response => {
                
                if(response.status===200){
                    
                    if(response.data!==null){
                        this.setState({getUsers:false,getUserById:true,userIdErr:'',userData:response});
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
                    <h1 className="text-center"> <b> View Users </b></h1>
                
                <div className="row">
                    <div className="col-md-12">
                         <button className="btn btn-primary btn-lg btn-block"  onClick={this.handleViewAllUsers}>View All</button> 
                         <br/>
                         <span className="text-danger">{this.state.noUserErr}</span>   
                    </div>
                    
                    <div className="col-md-12">
                        
                            <div className="form-group">
                                <h2><b>User ID : </b> </h2>
                                <input type="text" className="form-control" placeholder="Enter User Id" value={this.state.userId} onChange={this.handleUserIdChange}></input>
                            </div>
                            <div className="form-group">
                                <button  className="btn btn-primary btn-lg btn-block" onClick={this.handleViewUserById}>View By ID</button>
                            </div>
                        
                        <span className="text-danger">{this.state.userIdErr}</span> 
                    </div>
                </div>
                <br />
               

                <GetUsers state={this.state}/>

            </div>
        );
    }
}

class GetUsers extends Component {
    render(){

        if(this.props.state.getUsers===true && this.props.state.getUserById===false){

            const data = this.props.state.userData.data;
            const user = Object.keys(data).map((value,index)=>(
                <div className='' key={index}>
                    <h4><strong>ID : </strong>{data[value]._id}</h4>
                    <h4><strong>Name : </strong>{data[value].username}</h4>
                    <h4><strong>Age : </strong>{data[value].age}</h4>
                    <br />
                </div>
            ));
            return (
                <div>
                    {user}
                </div>
            );
        }
        if(this.props.state.getUsers===false && this.props.state.getUserById===true){

            const data = this.props.state.userData.data;
            const user = (
                <div className=''>
                    <h4><strong>ID : </strong>{data._id}</h4>
                    <h4><strong>Name : </strong>{data.username}</h4>
                    <h4><strong>Age : </strong>{data.age}</h4>
                    <br />
                </div> 
            );
            //console.log(data);
            return (
                <div>
                    {user}
                </div>
            );
        }

        if(this.props.state.getUsers===false && this.props.state.getUserById===false){
            return null;
        }
        
    }

}


export default ViewUser;