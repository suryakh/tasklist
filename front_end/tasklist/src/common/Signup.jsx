import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

export class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            mobile: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        if (this.state.username != "" && this.state.password != "" && this.state.email){
        axios({
            method:"POST",
            url:"https://tasklistflask.herokuapp.com/auth/signup",
            data:{
                username:this.state.username,
                email:this.state.email,
                password:this.state.password,
                mobile:this.state.mobile
            }
        })
        .then((res)=>{
            alert("user suceessfully registered")
            this.props.history.push("/login")
        })
        .catch ((res)=>{
            console.log("error")
        })
    }
    else {
        alert ("Please enter required information")
    }

    }
    render() {
        return (
            <div className="container ">
                <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 offset-xl-3 offset-lg-3 offset-md-0 offset-sm-0">
                <div className="row text-center">
                    <div className="col-12 text-left">
                        <label>Username</label>
                    </div>
                    <div className="col-12">
                        <input className="col-12 form-control" name="username" value={this.state.username} type="text" required onChange={this.handleChange} />
                    </div>
                    <div className="col-12 text-left">
                        <label>Email</label>
                    </div>
                    <div className="col-12">
                        <input name="email" className="col-12 form-control" value={this.state.email} type="text" required onChange={this.handleChange} />
                    </div>
                    <div className="col-12 text-left">
                        <label>Password</label>
                    </div>
                    <div className="col-12">
                        <input type="password" className="col-12 form-control" name="password" value={this.state.password} required onChange={this.handleChange} />
                    </div>
                    <div className="col-12 text-left">
                        <label>Mobile</label>
                    </div>
                    <div className="col-12">
                        <input type="text" className="col-12 form-control" name="mobile" value={this.state.mobile} required onChange={this.handleChange} />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-warning m-3  " onClick={this.handleClick}>Signup</button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    value:state.loginreducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
