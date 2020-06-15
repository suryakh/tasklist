import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { imageupload } from '../redux/Actions'

export class Userprofie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            profile: "",
            image: null
        }
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: 'https://tasklistflask.herokuapp.com/profile/user',
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                this.setState({
                    user: res.data[0],
                    profile: res.data[0].image == null ? "profile.png" : res.data[0].image
                })
            })
    }
    imageload = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    uploadimage = () => {
        let formdata = new FormData()
        formdata.append("image", this.state.image)
        axios({
            method: "POST",
            url: 'https://tasklistflask.herokuapp.com/profile/image',
            headers: {
                'Authorization': this.props.value.token
            },
            data: formdata
        })
            .then((res) => {
                axios({
                    method: "GET",
                    url: 'https://tasklistflask.herokuapp.com/profile/user',
                    headers: {
                        'Authorization': this.props.value.token
                    }
                })
                    .then((res) => {
                        this.setState({
                            user: res.data[0],
                            profile: res.data[0].image == null ? "profile.png" : res.data[0].image
                        })
                        this.props.imageupload(res.data[0].image)
                    })
            })
    }
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <img className="img-fluid" src={`https://tasklistflask.herokuapp.com/static/${this.state.profile}`} />
                    </div>
                    <div>

                        <div class="input-group">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile04" onChange={this.imageload} />
                                <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                            </div>
                            <div class="input-group-append">
                                <button class="btn btn-outline-success" type="button" onClick={this.uploadimage} >Button</button>
                            </div>
                        </div>





                    </div>
                    <div className="col-12 text-center m-3">
                        <div className="row">
                            <div className="col-2 text-left pt-1">
                                <h4>UserName:</h4>
                            </div>
                            <div className="col-9 text-left">
                                <h1>{this.state.user.username}</h1></div>
                        </div>
                    </div>
                    <div className="col-12 text-center m-3">
                        <div className="row">
                            <div className="col-2 text-left pt-1">
                                <h4>Email:</h4>
                            </div>
                            <div className="col-9 text-left">
                                <h3>{this.state.user.email}</h3></div>
                        </div>
                    </div>
                    <div className="col-12 text-center m-3">
                        <div className="row">
                            <div className="col-2 text-left pt-1">
                                <h4>Mobile:</h4>
                            </div>
                            <div className="col-9 text-left">
                                <h3>{this.state.user.mobile}</h3></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    value: state.loginreducer

})

const mapDispatchToProps = dispatch => {
    return {
        imageupload: (a) => dispatch(imageupload(a))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userprofie)
