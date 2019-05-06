import React from 'react';
import { Link } from 'react-router-dom';
import './cart.css';

export default class CartItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            total: 0
        }
    }
    componentDidMount() {
        console.log(this.props)
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
        if (cart[key].quantity<=1) ;
        else cart[key].quantity -= 1;
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
                            <div>
                                <div className="empty-cart-text">Cart Empty</div>
                                <div className="checkout-cta-disabled">
                                    <span>Cart is Empty</span>
                                </div>
                            </div>
                            :
                            addedProducts.map((item, key) =>
                                <div>
                                    <div className="cart__item">
                                        <img alt="product" src={item.src} />
                                        <h2>{item.name}</h2>
                                        <div className="price-wrapper">
                                            <p>{`₹ ${item.price}`}</p>
                                            <div className="cta-wrapper">
                                                <div>
                                                    <i className="fas fa-minus-circle" onClick={() => this.removeProducts(key)}></i>
                                                    <div>
                                                        {item.quantity}
                                                    </div>
                                                    <i className="fas fa-plus-circle" onClick={() => this.addProducts(key)}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={{
                                        pathname: `${this.props.path}/checkout`,
                                        state: {
                                            "cart": this.state.cart,
                                            "total": this.state.total
                                        }
                                    }}>
                                        <div className="checkout-cta-active">
                                            <span>Proceed for Checkout</span>
                                            <span>{(this.state.total !== 0) && `₹${this.state.total}`}</span>
                                        </div>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}