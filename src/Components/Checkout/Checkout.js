import React from 'react';
import './checkout.css';
import './../Store/cart.css';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Checkout extends React.Component {
    state = {
        showPayaplButton: false,
        email: null,
        fname: null,
        lname: null,
        phone: null,
        addr1: null,
        addr2: null,
        city: null,
        stateName: null,
        pincode: null
    }
    checkoutUser = (e) => {
        console.log(e.target)
        e.preventDefault();
        this.setState({ showPayaplButton: true });
        let body = this.state;
        delete body["showPayaplButton"];
        console.log(body)
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
        }

        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }

        const onError = (err) => {
            console.log("Error!", err);
        }

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
        return (
            <div className="checkout-wrapper">
                <div className="form-wrapper">
                    <form onSubmit={(e) => this.checkoutUser(e)} >
                        <input type="email" placeholder="Email" name="email" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="text" placeholder="First Name" name="fname" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="text" placeholder="Last Name" name="lname" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="tel" placeholder="Phone Number" name="phone" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="text" placeholder="Address Line 1" name="addr1" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="text" placeholder="Address Line 2" name="addr2" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="text" placeholder="City" name="city" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="text" placeholder="State" name="stateName" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="text" placeholder="Pincode" name="pincode" required disabled={this.state.showPayaplButton} onChange={this.onChange} />
                        <input type="submit" value="Checkout" className="checkout-button" />
                    </form>
                </div>
                <div className="checkout-cart__wrapper">
                    <div className="checkout__cart">
                        {
                            this.props.location.state.map((item, key) =>
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
                    {
                        (this.state.showPayaplButton) ? <div className="paypal-button__wrapper">
                            <PaypalExpressBtn className="paypal-button" env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} style={paypalButtonStyle} />
                        </div> : <div></div>
                    }
                </div>
            </div>
        );
    }
}
export default Checkout;