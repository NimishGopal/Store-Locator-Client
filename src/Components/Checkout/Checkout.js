import React from 'react';
import { Link } from 'react-router-dom';
import './checkout.css';
import './../Store/cart.css';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Success from './../Success/Success';


class Checkout extends React.Component {
    static defaultProps = {
        location: {
            state: {
                cart: []
            }
        },
        cart: []
    };

    state = {
        showPayaplButton: false,
        order: true,
        orderSuccessful: false,
        isLoggedIn: true,
        email: '',
        fname: '',
        lname: '',
        phone: '',
        addr1: '',
        addr2: '',
        city: '',
        stateName: '',
        pincode: ''
    }
    componentDidMount() {
        let User = JSON.parse(sessionStorage.getItem('User'));
        if (User) {
            this.setState({
                email: User.email,
                fname: User.fname,
                lname: User.lname,
                phone: User.phone,
                addr1: User.addr1,
                addr2: User.addr2,
                city: User.city,
                stateName: User.stateName,
                pincode: User.pincode,
            });
        }
        else{
            this.setState({isLoggedIn: false})
        }
    }
    
    checkoutUser = (e) => {
        e.preventDefault();
        if (this.state.order !== null) {
            this.validateForm(this.state)
                .then((result) => {
                    if (result === true) {
                        this.setState({ showPayaplButton: true });
                    }
                    else {
                        alert(result);
                    }
                });
        }
    }

    validateForm = (data) => {
        return new Promise((resolve, reject) => {
            if (!data.email.match(/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/)) {
                resolve('Not a valid email')
            }
            else if (!data.phone.match(/^\d{10}$/)) {
                resolve('Not a valid Phone number');
            }
            else {
                resolve(true);
            }
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    orderCashOnDelivery = () => {
        console.log('loda')
        let data = this.state;
        delete data["showPayaplButton"];
        delete data["order"];
        delete data["orderSuccessful"];
        data.cart = this.props.location.state.cart;

        fetch('http://localhost:5000/checkout', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((response) => {
                response.json().then((order) => {
                    this.setState({ order: order, orderSuccessful: true });
                });
            });
    }

    render() {
        const onSuccess = (payment) => {
            this.setState({ orderSuccessful: true })
            // alert(`Order Successful!`);
            console.log("The payment was succeeded!", payment);
        }

        const onCancel = (data) => {
            alert("Payment was cancelled! Order Cash on Delivery");
            // this.setState({showPayaplButton : true})
            console.log('The payment was cancelled!', data);
        }

        const onError = (err) => {
            console.log("Error!", err);
        }
        let { email, addr1, addr2, fname, lname, phone, city, stateName, pincode, showPayaplButton, isLoggedIn } = this.state;
        let env = 'sandbox';
        let currency = 'INR';
        let total = 0.50;

        const client = {
            sandbox: 'AU4LB-8cQ9wXEFc0fGSSEL7Em-nKurbGpEGJNrsUSNr8wcwNSUfC7ZUdEUMLr_OePFpwzionyxWHz5N8',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        const paypalButtonStyle = {
            color: 'blue',
            shape: 'rect',
            label: 'pay',
            height: 40
        }
        if (isLoggedIn) {
            return (
                (!this.state.orderSuccessful) ?
                    <div className="checkout-wrapper">
                        <div className="form-wrapper">
                            <form onSubmit={(e) => this.checkoutUser(e)} >
                                <input type="email" placeholder="Email" name="email" required disabled={showPayaplButton} value={email} onChange={this.onChange} />
                                <input type="text" placeholder="First Name" name="fname" required disabled={showPayaplButton} value={fname} onChange={this.onChange} />
                                <input type="text" placeholder="Last Name" name="lname" required disabled={showPayaplButton} value={lname} onChange={this.onChange} />
                                <input type="tel" placeholder="Phone Number" name="phone" required disabled={showPayaplButton} value={phone} onChange={this.onChange} />
                                <input type="text" placeholder="Address Line 1" name="addr1" required disabled={showPayaplButton} value={addr1} onChange={this.onChange} />
                                <input type="text" placeholder="Address Line 2" name="addr2" required disabled={showPayaplButton} value={addr2} onChange={this.onChange} />
                                <input type="text" placeholder="City" name="city" required disabled={showPayaplButton} value={city} onChange={this.onChange} />
                                <input type="text" placeholder="State" name="stateName" required disabled={showPayaplButton} value={stateName} onChange={this.onChange} />
                                <input type="text" placeholder="Pincode" name="pincode" required disabled={showPayaplButton} value={pincode} onChange={this.onChange} />
                                <input type="submit" value="Checkout" className="checkout-button" />
                            </form>
                        </div>
                        <div className="checkout-cart__wrapper">
                            <div className="checkout__cart">
                                {
                                    this.props.location.state.cart.map((item, key) =>
                                        <div className="cart__item" key={key}>
                                            <img alt="product" src={item.src} />
                                            <h2>{item.name}</h2>
                                            <div className="price-wrapper">
                                                <p>{`Quantity: ${item.quantity}`}</p>
                                                <p>{`₹ ${item.price}`}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <p>{`Total: ₹${this.props.location.state.total}`}</p>
                            {
                                (this.state.showPayaplButton) ?
                                    <div className="paypal-button__wrapper">
                                        <div className="checkout-button cod" onClick={() => this.orderCashOnDelivery()}>Cash On Delivery</div>
                                        <PaypalExpressBtn className="paypal-button" env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={this.orderCashOnDelivery} onCancel={onCancel} style={paypalButtonStyle} />
                                    </div> : <div></div>
                            }
                        </div>
                    </div>
                    :
                    <Success
                        successMessage="Yay! Your Order has been placed!"
                        linkText="Continue Shopping with us!"
                        order={this.state.order}
                    />
            );
        }
        else {
            return (
                <div className="login-button-container">
                    <p>Looks like you're not logged in!!!</p>
                    <p><Link to={{ pathname: '/login', state: { prevPath: this.props.location.pathname, cart: this.props.location.state.cart, total: this.props.location.state.total } }}>Click here</Link> to Login or Register to proceed with your order.</p>
                </div>
            );
        }
    }
}

export default Checkout;