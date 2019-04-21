import React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <div className="login-wrapper">
                <form>
                    <input type="email" placeholder="Email" name="email" required onChange={this.onChange} />
                    <input type="password" placeholder="password" required onChange={this.onChange}></input>
                    <input type="submit" value="Login" className="checkout-button" />
                </form>
            </div>
        );
    }
}