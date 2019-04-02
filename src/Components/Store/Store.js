import React from 'react';
import Data from './../../DummyData/marker.json';
import './../../styles/product.css';
import Product from './Product';
import Header from './../Header/Header';
import Footer from '../Footer/Footer.js';


export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            cart: [],
            shouldOpenCart: false
        }
    }
    
    products = Data[1].markers[0].products;
    componentDidMount = () => {
        let productList = [];
        this.products.map((product) =>
            productList.push(
                {
                    "src": product.image,
                    "name": product.name,
                    "price": product.price,
                    "prodID": product.id,
                    "quantity": 0
                })
        );
        this.setState({ productList: productList });
    }

    getStoreState = () => this.state;

    openCart = () => {
        this.setState({shouldOpenCart: true});
    }

    closeCart = () => {
        this.setState({shouldOpenCart: false});
    }

    updateCart = (name, id, quantity, price, imgSrc) => {
        let cart = this.getStoreState().cart;
        let add = true;
        if (cart.length > 0) {
            // CHECK IF ITEM IS ALREADY THERE IN CART
            cart.forEach((item, key) => {
                if (item.id === id) {
                    item.quantity = quantity;
                    add = false;
                    if (item.quantity == 0) {
                        cart.splice(key, 1)
                    }
                }
            });
            // IF NOT PRESENT, ADD IT
            if (add) {
                cart.push({ "name": name, "id": id, "quantity": quantity, "price": price, "src": imgSrc });
            }
        }
        else {
            // FIRST PRODUCT
            cart.push({ "name": name, "id": id, "quantity": quantity, "price": price, "src": imgSrc });
        }
        this.setState({ cart });
    }

    addItemToCart = (key) => {
        let prods = this.state.productList;
        prods[key].quantity = prods[key].quantity + 1;
        this.updateCart(prods[key].name, prods[key].prodID, prods[key].quantity, prods[key].price, prods[key].src);
        this.setState({ productList: prods })
    }

    removeItemFromCart = (key) => {
        let prods = this.state.productList;
        if (prods[key].quantity) {
            prods[key].quantity = prods[key].quantity - 1;
        }
        this.updateCart(prods[key].name, prods[key].prodID, prods[key].quantity, prods[key].price, prods[key].src);
        this.setState({ productList: prods })
    }

    render() {
        return (
            <div>
                <Header
                cart={true}
                getStoreState={() => this.getStoreState()}
                openCart={() => this.openCart()}
                closeCart={() => this.closeCart()}
                />
                <div className="product-wrapper">
                    {
                        (this.state.productList !== null) &&
                        this.state.productList.map((product, key) =>
                            <Product
                                src={product.src}
                                name={product.name}
                                price={product.price}
                                prodID={product.prodID}
                                count={product.quantity}
                                key={key}
                                addItemToCart={() => { this.addItemToCart(key) }}
                                removeItemFromCart={() => { this.removeItemFromCart(key) }}
                            />
                        )
                    }
                </div>
                <Footer />
            </div>
        );
    }
}