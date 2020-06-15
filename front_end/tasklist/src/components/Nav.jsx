import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { logout } from '../redux/Actions'

export class Nav extends Component {
    handleClick = () => {
        this.props.logout()
    }
    render() {
        return (
            <div className="container-fluid p-4 mb-5 bg-primary">
                <div className="row">
                    <div className="col-lg-6 col-xl-6 col-sm-3 col-md-3">
                        <div className="row">
                            <div className="col-4">
                                <Link to="/"><button className="btn btn-primary">Home</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-sm-0 col-md-0"></div>
                    <div className="col-lg-3 col-xl-3 col-sm-6 col-md-6">
                        <div className="row d-flex justify-content-end">
                            <div className="col-4">
                                {this.props.value.login && <Link className="text-white" to="/userprofile"><div className="row"><div className="col-4 bg-white rounded-circle d-flex justify-content-center"><img className="img-fluid" src={`https://tasklistflask.herokuapp.com/static/${this.props.value.image}`} /></div> <div className="col-6"><h3>{this.props.value.user}</h3></div></div></Link>}
                            </div>
                            {this.props.value.login && <div className="col-4">
                                <Link className="text-white" to="/tlists"><button className="btn btn-primary">My Tasklists</button></Link>
                            </div>}
                            {this.props.value.login && <div className="col-4">
                                <button className="btn btn-primary" onClick={this.handleClick}>Logout</button>
                            </div>}
                            {!this.props.value.login && <div className="col-4">

                                <Link className="text-white" to="/login"><button className="btn btn-primary">Login</button></Link>

                            </div>}
                            {!this.props.value.login && <div className="col-4">

                                <Link className="text-white" to="/signup"><button className="btn btn-primary">Register</button></Link>


                            </div>}
                            {!this.props.value.login && <Redirect to="/" />}
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
        logout: () => dispatch(logout())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
