import React, { Component } from 'react';


class LoginForm extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            username: undefined,
            email: undefined,
            password: undefined,
            signUp: {
                success: undefined,
                message: undefined
            }
        }
    }

    static displayName = 'ui-LoginForm'

    /*
    Register Form area
    */

    handleSignUpSubmit(e) {
        e.preventDefault();
        let dataToSend = {
            userData: {
                username: this.refs.username.value,
                email: this.refs.email.value,
                password: this.refs.password.value
            }
        };
        console.log(JSON.stringify(dataToSend))

        let url = 'http://localhost:3001/users/register';

        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson.success) {
                    this.setState({
                        signUp: {
                            success: true,
                            message: responseJson.message
                        }
                    });
                } else {
                    this.setState({
                        signUp: {
                            success: false,
                            message: responseJson.message
                        }
                    });
                }
            })

        this.refs.username.value = '';
        this.refs.email.value = '';
        this.refs.password.value = '';

    }



    /*
    Login Form area
    */

    handleSubmit(e) {
        e.preventDefault();
        let dataToSend = {
            userData: {
                email: this.state.email,
                password: this.state.password
            }
        };
        console.log(JSON.stringify(dataToSend))
        let url = 'http://localhost:3001/auth/login';

        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    localStorage.setItem('DD101_TOKEN', responseJson.token);
                }
            })
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                {/* Begin Modal Register Form */}
                <div className="modal fade" id="signupModel" tabIndex="-1" role="dialog" aria-labelledby="signupModelLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="signupModelLabel">Registration Form</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                {
                                    this.state.signUp.success !== undefined ? (
                                        this.state.signUp.success === true ?
                                            <div className="alert alert-success" role="alert">
                                                {this.state.signUp.message}
                                            </div>
                                            :
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.signUp.message}
                                            </div>
                                    ) : ''
                                }

                                <form onSubmit={this.handleSignUpSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="form-control-label">Name</label>
                                        <input type="text" ref="username" className="form-control" id="username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-control-label">Email</label>
                                        <input type="email" ref="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="form-control-label">Password:</label>
                                        <input type="password" ref="password" className="form-control" id="password" />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Begin Modal Register Form */}

                {/* Begin Modal List Authenticad List  */}

                <div className="modal fade" id="authenticatedModal" tabIndex="-1" role="dialog" aria-labelledby="authenticatedModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="authenticatedModalLabel">Only Authenticated Users can see this list!</h5>
                            </div>
                            <div className="modal-body">

                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Name: Developer Deck 101</h5>
                                            <small>01/09/2017</small>
                                        </div>
                                        <p className="mb-1">E-mail: devdeck101@gmail.com</p>
                                        <small>Password (Should never do that)</small>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Name: Developer Deck 101</h5>
                                            <small>01/09/2017</small>
                                        </div>
                                        <p className="mb-1">E-mail: devdeck101@gmail.com</p>
                                        <small>Password (Should never do that)</small>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Name: Developer Deck 101</h5>
                                            <small>01/09/2017</small>
                                        </div>
                                        <p className="mb-1">E-mail: devdeck101@gmail.com</p>
                                        <small>Password (Should never do that)</small>
                                    </a>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-block" data-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* End Modal List Authenticad List */}


                {/* Begin Login Form */}
                <div className="row" style={{ paddingTop: '50px' }}>
                    <div className="col">
                    </div>
                    <div className="col">
                        <div className="card" style={{ width: '20rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                            <img className="card-img-top" src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAV3AAAAJDEwODQxZWI3LTYyMmUtNDEzZS04YjNlLTNmNzA0YjY0OTMwMg.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="checkbox" className="form-check-input" />
                                            <span>Remember me</span>
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                    <small id="emailHelp" className="form-text text-muted">If you are not registered. Plese <a href="#" data-toggle="modal" data-target="#signupModel" data-whatever="@mdo" >Signup</a></small>
                                    <br />
                                    <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#authenticatedModal" data-whatever="@mdo" >Call Authenticated only API</button>
                                    <small id="emailHelp" className="form-text text-muted">Only registered and logged users can call and see the list. Plese click the button above to call the API.</small>
                                </form>


                            </div>
                        </div>

                    </div>
                    <div className="col">
                    </div>
                </div>
                {/* End Login Form */}
            </div>
        );
    }
}
export default LoginForm;