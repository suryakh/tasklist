import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-12 m-5 p-5 text-center">
                    <h1>Task Manager</h1>
                    <div><img src ="/images/bgimage.png"/></div>
                    {!this.props.value.login && <Link to="/login"><button className="btn btn-primary">Login</button></Link>}
                    {this.props.value.login && <Link to="/tlists"><button className="btn btn-primary">MyTasks</button></Link>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
