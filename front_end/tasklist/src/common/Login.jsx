import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { login } from '../redux/Actions'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        let temp = {
            username: this.state.username,
            password: this.state.password
        }
        axios({
            method: "POST",
            url: "https://tasklistflask.herokuapp.com//auth/login",
            data: temp
        })
            .then((res) => {
                let temp = {
                    token: res.data.token,
                    username: this.state.username,
                    image: res.data.profileimg
                }
                this.props.login(temp)
                console.log(res)
                this.props.history.push("/tlists")
            })
            .catch((res) => {
                alert("inavlid username or passwords")
            })

    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-xl-3 col-sm-0 col-md-0"></div>
                    <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12">
                        <div className="col-12">
                            <label>Username</label>
                        </div>
                        <div className="col-12">
                            <input className="col-12 form-control" name="username" placeholder="Enter username" value={this.state.username} type="text" onChange={this.handleChange} />
                        </div>
                        <div className="col-12">
                            <label>Password</label>
                        </div>
                        <div className="col-12">
                            <input className="col-12 form-control" type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <div className="col-12 mt-2 text-center">
                            <button className="btn btn-primary" onClick={this.handleClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        value: state.loginreducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (a) => dispatch(login(a))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
