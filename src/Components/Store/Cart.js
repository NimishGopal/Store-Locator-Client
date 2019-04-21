import React from 'react';
import CartItems from './CartItems';
import './cart.css';

const Cart = (props) => {
       let cartLength = props.getStoreState().cart.length;
        return (
            <div className="cart">
                {
                    (cartLength !== 0) &&
                    <p>{cartLength}</p>
                }
                <i onClick={props.openCart} className="fas fa-cart-plus cart-icon"></i>
                {(props.getStoreState().shouldOpenCart) && 
                <CartItems 
                cartItems={props.getStoreState().cart}
                closeCart={() => props.closeCart()}
                path={props.path}
                />}
            </div>
        );
}

export default Cart;