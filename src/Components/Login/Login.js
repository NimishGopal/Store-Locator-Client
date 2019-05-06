import React from 'react';
import './login.css';
import Success from './../Success/Success';

export default class Login extends React.Component {
    state = {
        showLoginForm: true,
        isLoggedIn: false,
        email: '',
        fname: '',
        lname: '',
        phone: '',
        addr1: '',
        addr2: '',
        city: '',
        stateName: '',
        pincode: '',
        password: ''
    }
    componentDidMount() {
        // sessionStorage.clear('User')
        let user = JSON.parse(sessionStorage.getItem('User'));
        if (user !== null) {
            this.props.history.push(`/`);
        }
    }
    loginUser = (e) => {
        e.preventDefault();
        var loginData = {
            "email": this.state.email,
            "password": this.state.password
        };
        fetch('http://localhost:5000/login', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(loginData)
        })
            .then((response) => {
                response.json().then((response) => {
                    if (Object.entries(response).length !== 0 && response.hasOwnProperty("email")) {
                        this.setState({ isLoggedIn: true })
                        sessionStorage.setItem('User', JSON.stringify(response));
                        if (typeof (this.props.location.state) === undefined) {
                            if (this.props.location.state.prevPath.includes('checkout')) {
                                this.setState({ isLoggedIn: true }, () =>
                                    this.props.history.push({
                                        pathname: this.props.location.state.prevPath,
                                        state: {
                                            prevPath: 'login',
                                            cart: this.props.location.state.cart,
                                            total: this.props.location.state.total,
                                            User: response
                                        }
                                    }));
                            }
                        }
                        else {
                            if (this.props.location.state.prevPath.includes('checkout')) {
                                this.setState({ isLoggedIn: true }, () =>
                                    this.props.history.push({
                                        pathname: this.props.location.state.prevPath,
                                        state: {
                                            prevPath: 'login',
                                            cart: this.props.location.state.cart,
                                            total: this.props.location.state.total,
                                            User: response
                                        }
                                    }));
                            }
                        }
                    }
                    else if (response.hasOwnProperty("message")) {
                        alert("Incorrect Password")
                    }
                    else {
                        alert('Email not registered')
                    }
                });
            });

    }
    registerUser = (e) => {
        e.preventDefault();
        var registerData = this.state;
        ['isLoggedIn', 'showLoginForm'].forEach(e => delete registerData[e]);
        console.log(registerData)
        fetch('http://localhost:5000/register', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(registerData)
        })
            .then((response) => {
                response.json().then((response) => {
                    if (Object.entries(response).length !== 0) {
                        this.setState({ isLoggedIn: true })
                        sessionStorage.setItem('User', JSON.stringify(response));
                        if (typeof (this.props.location.state.prevPath) !== undefined && this.props.location.state.prevPath.includes('checkout')) {
                            this.setState({ isLoggedIn: true }, () =>
                                this.props.history.push({
                                    pathname: this.props.location.state.prevPath,
                                    state: {
                                        prevPath: 'login',
                                        cart: this.props.location.state.cart,
                                        total: this.props.location.state.total,
                                        User: response
                                    }
                                }));
                        }
                        else {
                            window.location.assign('/')
                        }
                    }
                    else {
                        alert('Email already registered')
                    }
                });
            });

    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    changeFormState = () => this.setState({ showLoginForm: !this.state.showLoginForm });

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <div className="login-register-wrapper">
                    <div className="tab-wrapper">
                        <div onClick={this.changeFormState} className={(this.state.showLoginForm) ? 'selected' : ''}>Login</div>
                        <div onClick={this.changeFormState} className={(!this.state.showLoginForm) ? 'selected' : ''}>Register</div>
                    </div>
                    {
                        (this.state.showLoginForm) ?
                            <div className="forms">
                                <form onSubmit={(e) => this.loginUser(e)}>
                                    <input type="email" placeholder="Email" name="email" required onChange={this.onChange} />
                                    <input type="password" placeholder="Password" name="password" required onChange={this.onChange}></input>
                                    <input type="submit" value="Login" className="checkout-button" />
                                </form>
                            </div> :
                            <div className="forms">
                                <form onSubmit={(e) => this.registerUser(e)}>
                                    <input type="email" placeholder="Email" name="email" required onChange={this.onChange} />
                                    <input type="text" placeholder="First Name" name="fname" required onChange={this.onChange} />
                                    <input type="text" placeholder="Last Name" name="lname" value={this.state.lname} required onChange={this.onChange} />
                                    <input type="tel" placeholder="Phone Number" name="phone" required onChange={this.onChange} />
                                    <input type="text" placeholder="Address Line 1" name="addr1" required onChange={this.onChange} />
                                    <input type="text" placeholder="Address Line 2" name="addr2" required onChange={this.onChange} />
                                    <input type="text" placeholder="City" name="city" required onChange={this.onChange} />
                                    <input type="text" placeholder="State" name="stateName" required onChange={this.onChange} />
                                    <input type="text" placeholder="Pincode" name="pincode" required onChange={this.onChange} />
                                    <input type="password" placeholder="password" name="password" required onChange={this.onChange}></input>
                                    <input type="submit" value="Register" className="checkout-button" />
                                </form>
                            </div>
                    }
                </div>
            );
        }
        else {
            return (
                <Success
                    successMessage={'Yay!! Login Successful!'}
                    linkText={'Let\'s start Shopping!!!!'}
                />
            );
        }
    }
}