import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../common/Login'
import Signup  from '../common/Signup'
import Nav from '../components/Nav'
import Tasklists from '../components/Tasklists'
import Tasks from '../components/Tasks'
import Userprofile from '../components/Userprofie'

export class Router extends Component {
    render() {
        return (

            <div>
                <Nav />
                <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/tlists" exact render= {(props)=><Tasklists {...props} />}/>
                <Route path="/login" exact render={(props)=><Login {...props} />}/>
                <Route path="/signup" exact render={(props)=><Signup {...props} />}/>
                <Route path="/tlist/:id" exact render={(props)=><Tasks {...props} />}/>
                <Route path="/userprofile" exact render={(props)=><Userprofile {...props} />}/>

                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
