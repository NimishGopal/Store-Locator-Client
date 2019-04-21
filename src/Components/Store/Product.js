import React from 'react';

export default class Product extends React.Component {
    render() {
        return (
            <div className="product">
                <img alt="product" src={this.props.src} />
                <h2>{this.props.name}</h2>
                <div className="price-wrapper">
                    <p>{`₹ ${this.props.price}`}</p>
                    <div className="cta-wrapper">
                        {
                            (!this.props.quantity) ?
                                <div className="add-to-cart-cta"  onClick={() => { this.props.addItemToCart(this.props.prodID, this.props.name) }}>
                                    Add To Cart
                                </div>
                                :
                                <div>
                                    <i className="fas fa-minus-circle" onClick={() => { this.props.removeItemFromCart(this.props.prodID, this.props.name) }}></i>
                                    <div>
                                        {this.props.quantity}
                                    </div>
                                    <i className="fas fa-plus-circle" onClick={() => { this.props.addItemToCart(this.props.prodID, this.props.name) }}></i>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
};
