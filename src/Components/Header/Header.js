import React from 'react';
import Cart from './../Store/Cart';
import { Link } from 'react-router-dom';
import './header.css';

export default class Header extends React.Component {
    state = {
        showOverlay: false,
        isLoggedIn: null
    }
    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem('User'));
        if (user === null) {
            this.setState({ isLoggedIn: false })
        }
        else {
            this.setState({ isLoggedIn: true })
            //TODO: Change this
        }
    }
    showOverlay = () => {
        this.setState({ showOverlay: !this.state.showOverlay })
    }
    logoutUser = () => {
        sessionStorage.clear('User');
        window.location.reload(); 
    }
    loginUser = () => {
        sessionStorage.clear('User');
        window.location.reload(); 
    }
    render() {
        return (
            <div className="header">
                <Link to='/'>
                    <div className="logo">
                        <img alt="home-logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIj48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MDAgNjAwKSBzY2FsZSgwLjY5IDAuNjkpIHJvdGF0ZSgwKSB0cmFuc2xhdGUoLTYwMCAtNjAwKSIgc3R5bGU9ImZpbGw6I2ZmZmZmZiI+PHN2ZyBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHg9IjBweCIgeT0iMHB4Ij48dGl0bGU+QXJ0Ym9hcmQgMzQ8L3RpdGxlPjxwYXRoIGQ9Ik02NCwwQTUyLDUyLDAsMCwwLDQ2LDEwMC44bDE0LjY4LDI1LjI3YTQsNCwwLDAsMCw2LjY0LDBMODIsMTAwLjhBNTIsNTIsMCwwLDAsNjQsMFpNNjIsODJhNCw0LDAsMSwxLDQtNEE0LDQsMCwwLDEsNjIsODJabTIwLDBhNCw0LDAsMSwxLDQtNEE0LDQsMCwwLDEsODIsODJaTTk3Ljc2LDQ1LjM3bC04LDIyQTQsNCwwLDAsMSw4Niw3MEg1OGE0LDQsMCwwLDEtMy43NS0yLjZMNDMuMjMsMzhIMzRhNCw0LDAsMCwxLDAtOEg0NmE0LDQsMCwwLDEsMy43NSwyLjZsMTEsMjkuNEg4My4ybDctMTkuMzdhNCw0LDAsMCwxLDcuNTIsMi43M1oiPjwvcGF0aD48L3N2Zz48L2c+PC9nPjwvc3ZnPg==" />
                        Store Locator
            </div>
                </Link>
                {(this.props.cart) &&
                    <Cart
                        getStoreState={() => this.props.getStoreState()}
                        openCart={() => this.props.openCart()}
                        closeCart={() => this.props.closeCart()}
                    />}
                <div className="account-avatar" onClick={this.showOverlay}>
                    <i className="far fa-user-circle"></i>
                    {
                        (this.state.showOverlay) &&
                        [
                            (this.state.isLoggedIn) ?
                                <div className="logout-hover-cta" onClick={this.logoutUser}>
                                    <p>Logout</p>
                                </div>
                                :
                                <Link to='/login'>
                                    <div className="logout-hover-cta">
                                        <p>Login</p>
                                    </div>
                                </Link>
                        ]
                    }
                </div>
            </div>
        )
    }
}