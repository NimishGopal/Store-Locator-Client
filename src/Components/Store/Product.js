import React from 'react';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="product">
                <img src={this.props.src} />
                <h2>{this.props.name}</h2>
                <div className="price-wrapper">
                    <p>{`₹ ${this.props.price}`}</p>
                    <div className="cta-wrapper">
                        {
                            (!this.props.count) ?
                                <div className="add-to-cart-cta"  onClick={() => { this.props.addItemToCart(this.props.prodID, this.props.name) }}>
                                    Add To Cart
                                </div>
                                :
                                <div>
                                    <i className="far fa-minus-square" onClick={() => { this.props.removeItemFromCart(this.props.prodID, this.props.name) }}></i>
                                    <div>
                                        {this.props.count}
                                    </div>
                                    <i className="far fa-plus-square" onClick={() => { this.props.addItemToCart(this.props.prodID, this.props.name) }}></i>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
};
