import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

export class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasklist: {},
            tasks: [],
            content: "",
            istaskEdit: false,
            istitleEdit: false,
            isadd: false,
            taskid: ""
        }
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tasklistflask.herokuapp.com/tlist/singletasklist/${this.props.match.params.id}`,
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                this.setState({
                    tasklist: res.data[0]
                })
            })
            .catch((res) => {
                console.log("error")
            })
        axios({
            method: "GET",
            url: `https://tasklistflask.herokuapp.com/task/gettasks/${this.props.match.params.id}`,
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    tasks: res.data
                })
            })
            .catch((res) => {
                console.log("error")
            })
    }

    addmodal = () => {
        this.setState({
            isadd: true,
            istaskEdit: false,
            istitleEdit: false,
            content: ""
        })
    }

    addtask = () => {

        axios({
            method: "POST",
            url: `https://tasklistflask.herokuapp.com/task/addtask/${this.props.match.params.id}`,
            data: {
                content: this.state.content
            },
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                axios({
                    method: "GET",
                    url: `https://tasklistflask.herokuapp.com/task/gettasks/${this.props.match.params.id}`,
                    headers: {
                        'Authorization': this.props.value.token
                    }
                })
                    .then((res) => {
                        console.log(res)
                        this.setState({
                            tasks: res.data
                        })
                    })
                    .catch((res) => {
                        console.log("error")
                    })
            })
            .catch((res) => {
                console.log("error")
            })
        this.setState({
            content: "",
            isadd: false
        })

    }


    //  content entering 

    handleChage = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    // edittask function 

    edittask = (id) => {
        console.log(id, "modal")
        this.setState({
            istaskEdit: true,
            istitleEdit: false,
            isadd: false
        })
        axios({
            method: "GET",
            url: `https://tasklistflask.herokuapp.com/task/getsingletask/${id}`,
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                this.setState({
                    content: res.data[0].content,
                    taskid: res.data[0].id
                })
            })
            .catch((res) => {
                console.log("error")
            })
    }

    deletetask = (id) => {
        this.setState({
            istaskEdit: true,
            istitleEdit: false,
            isadd: false
        })
        axios({
            method: "DELETE",
            url: `https://tasklistflask.herokuapp.com/task/getsingletask/${id}`,
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                axios({
                    method: "GET",
                    url: `https://tasklistflask.herokuapp.com/task/gettasks/${this.props.match.params.id}`,
                    headers: {
                        'Authorization': this.props.value.token
                    }
                })
                    .then((res) => {
                        console.log(res)
                        this.setState({
                            tasks: res.data
                        })

                    })
                    .catch((res) => {
                        console.log("error")
                    })
            })
    }

    // updatetask 

    updatetask = () => {
        axios({
            method: "POST",
            url: `https://tasklistflask.herokuapp.com/task/getsingletask/${this.state.taskid}`,
            data: { 'content': this.state.content },
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                axios({
                    method: "GET",
                    url: `https://tasklistflask.herokuapp.com/task/gettasks/${this.props.match.params.id}`,
                    headers: {
                        'Authorization': this.props.value.token
                    }
                })
                    .then((res) => {
                        console.log(res)
                        this.setState({
                            tasks: res.data
                        })
                    })
                    .catch((res) => {
                        console.log("error")
                    })

            })
            .catch((res) => {
                console.log("error")
            })
        this.setState({
            content: "",
            istaskEdit: false
        })
    }

    edittitlemodal = () => {
        this.setState({
            istitleEdit: true,
            istaskEdit: false,
            isadd: false
        })
        axios({
            method: "GET",
            url: `https://tasklistflask.herokuapp.com/tlist/singletasklist/${this.props.match.params.id}`,
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                this.setState({
                    content: res.data[0].title
                })
            })
            .catch((res) => {
                console.log("error")
            })

    }


    edittitle = () => {
        axios({
            method: "POST",
            url: `https://tasklistflask.herokuapp.com/tlist/singletasklist/${this.props.match.params.id}`,
            data: {
                "content": this.state.content
            },
            headers: {
                'Authorization': this.props.value.token
            }
        })
            .then((res) => {
                axios({
                    method: "GET",
                    url: `https://tasklistflask.herokuapp.com/tlist/singletasklist/${this.props.match.params.id}`,
                    headers: {
                        'Authorization': this.props.value.token
                    }
                })
                    .then((res) => {
                        this.setState({
                            tasklist: res.data[0]
                        })
                    })
                    .catch((res) => {
                        console.log("error")
                    })
            })
            .catch((res) => {
                console.log("error")
            })
        this.setState({
            istitleEdit: false,
            content: ""
        })

    }
    deletetasklist = () => {
        window.confirm("Are you sure you wish to clear the page?") &&
            axios({
                method: "DELETE",
                url: `https://tasklistflask.herokuapp.com/tlist/singletasklist/${this.props.match.params.id}`,
                headers: {
                    'Authorization': this.props.value.token
                }
            })
                .then((res) => {
                    this.props.history.push("/tlists")
                })
                .catch((res) => {
                    console.log("error")
                })
    }
    render() {
        // console.log(this.state.content)
        return (
            <div>
                <div className="container">
                    <div className="col-12">
                        <div className="row border">
                            <div className="col-lg-8 col-xl-8 col-sm-12 col-md-12">
                                <h1>Title:{this.state.tasklist.title}</h1>
                            </div>
                            <div className="col-lg-3 col-xl-3 col-sm-12 col-md-12">
                                <button className="btn btn-outline-primary m-2" data-toggle="modal" data-target="#exampleModal" onClick={this.edittitlemodal} >Edit</button>
                                <button className="btn btn-outline-success m-2" data-toggle="modal" data-target="#exampleModal" onClick={() => this.addmodal()}>Add</button>
                                <button className="btn btn-outline-danger m-2" onClick={this.deletetasklist}>Delete</button>
                            </div>
                        </div>
                        {/* <div className="row"> */}
                        {this.state.tasks.map((ele) => <div className="row border m-2 p-2"><div className="col-lg-8 col-xl-8 col-sm-12 col-md-12">{ele.content}</div><div className="col-lg-2 col-xl-2 col-sm-6 col-md-6"><button className="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={() => this.edittask(ele.id)}>edit</button></div><div className="col-lg-2 col-xl-2 col-sm-6 col-md-6"><button className="btn btn-danger" onClick={() => this.deletetask(ele.id)}>delete</button></div></div>)}
                        {/* </div> */}
                    </div>
                </div>




                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {this.state.isadd && <h5 className="modal-title" id="exampleModalLabel">Add task</h5>}
                                {this.state.istaskEdit && <h5 className="modal-title" id="exampleModalLabel">Edit task</h5>}
                                {this.state.istitleEdit && <h5 className="modal-title" id="exampleModalLabel">Edit Tasklist Title</h5>}

                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <input className="col-12 form-control" type="text" value={this.state.content} onChange={this.handleChage} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {this.state.isadd && <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addtask}>Add task</button>}
                                {this.state.istaskEdit && <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.updatetask}>Update task</button>}
                                {this.state.istitleEdit && <button className="btn btn-primary" onClick={this.edittitle}>UpdateTitle</button>}

                            </div>
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

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)