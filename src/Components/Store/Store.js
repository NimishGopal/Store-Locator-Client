import React from 'react';
import './product.css';
import Product from './Product';
import Cart from './Cart';


export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeID: null,
            category: null,
            productList: [],
            cart: [],
            shouldOpenCart: false
        }
    }
    // NOT A GREAT SOLUTION BUT DO THIS FOR NOW
    refactorProductList = (cart, productList) => {
        return new Promise((resolve) => {
            cart.map((cartVal) => {
                return productList.forEach((productVal, key) => {
                    if(productVal.prodID === cartVal.id)
                    productList[key] = cartVal;
                });
            });
            resolve(productList); 
        })  
    }
    componentDidMount = () => {
        // localStorage.clear('cart');
        let pathname = this.props.location.pathname;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let storeID = pathname.split('/')[2];
        let currentStore = localStorage.getItem('currentStore');
        let category = pathname.split('/')[1];
        if (cart === null) {
            this.setState({ cart: [] })
        }
        else {
            this.setState({ cart: cart })
        }
        if(currentStore === null){
            localStorage.setItem('currentStore', storeID);
        }
        else{
            if(currentStore !== storeID){
                localStorage.clear('cart');
                this.setState({storeID: storeID})
            }
        }
        this.setState({ storeID: storeID, category: category }, () => {
            fetch(`http://localhost:5000/${this.state.category}/${this.state.storeID}`)
                .then((response) => {
                    let productList = [];
                    response.clone().json().then((val) => {
                        val.map((product) => 
                            productList.push(
                                {
                                    "src": product.image,
                                    "name": product.name,
                                    "price": product.price,
                                    "prodID": product._id,
                                    "quantity": 0
                                })
                        );
                        // TODO: Come back here and find a better solution
                        if(this.state.cart.length !== 0)
                         this.refactorProductList(this.state.cart, productList).then((res) => this.setState({ productList: res }))
                        else
                        this.setState({ productList: productList })
                    });
                });
        });
    }
    getStoreState = () => this.state;

    openCart = () => {
        this.setState({ shouldOpenCart: true });
    }

    closeCart = () => {
        this.setState({ shouldOpenCart: false });
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
                    if (item.quantity === 0) {
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
        this.setState({ cart }, () =>
            localStorage.setItem('cart', JSON.stringify(this.state.cart))
        );
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
                <Cart
                    getStoreState={() => this.getStoreState()}
                    openCart={() => this.openCart()}
                    closeCart={() => this.closeCart()}
                    path={this.props.location.pathname}
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
                                quantity={product.quantity}
                                key={key}
                                addItemToCart={() => { this.addItemToCart(key) }}
                                removeItemFromCart={() => { this.removeItemFromCart(key) }}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}