import React from 'react';
import './../../styles/cart.css'

export default class CartItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            total: 0
        }
    }
    componentDidMount() {
        this.setState({ cart: this.props.cartItems }, () => {
            document.body.style.overflow = "hidden";
            this.calculateTotal();
        });

    }

    addProducts = (key) => {
        let cart = this.state.cart;
        cart[key].quantity += 1;
        this.setState({ cart }, () => this.calculateTotal())
    }

    removeProducts = (key) => {
        let cart = this.state.cart;
        if(cart[key].quantity) cart[key].quantity -= 1;
        this.setState({ cart }, () => this.calculateTotal())
    }

    calculateTotal = () => {
        let cart = this.state.cart;
        let total = 0;
        cart.forEach((ele) => total += (ele.quantity * ele.price));
        this.setState({ total }, () => console.log(this.state.total));
    }

    proceedForCheckout = () => {
        console.log(this.state.cart)
    }

    render() {
        let addedProducts = this.props.cartItems;
        return (
            <div className="cart-overlay">
                <div className="cart-items">
                    <div className="cart__header">My Cart</div>
                    <i className="fas fa-arrow-left cart__close" onClick={this.props.closeCart}></i>
                    {
                        (!addedProducts.length)
                            ?
                            <div className="empty-cart-text">Cart Empty</div>
                            :
                            addedProducts.map((item, key) =>
                                <div className="cart__item">
                                    <img src={item.src} />
                                    <h2>{item.name}</h2>
                                    <div className="price-wrapper">
                                        <p>{`₹ ${item.price}`}</p>
                                        <div className="cta-wrapper">
                                            <div>
                                                <i className="far fa-minus-square" onClick={() => this.removeProducts(key)}></i>
                                                <div>
                                                    {item.quantity}
                                                </div>
                                                <i className="far fa-plus-square" onClick={() => this.addProducts(key)}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    <div className="checkout-cta" onClick={() => this.proceedForCheckout()}>
                    <span>Checkout</span>
                    <span>{(this.state.total !==0) && `₹${this.state.total}`}</span></div>
                </div>
            </div>
        );
    }
}