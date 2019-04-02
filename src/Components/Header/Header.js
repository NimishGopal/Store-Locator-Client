import React from 'react';
import Cart from './../Store/Cart'
import './../../styles/header.css';

const Header = (props) =>
    <div className="header">
        <div className="logo">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIj48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MDAgNjAwKSBzY2FsZSgwLjY5IDAuNjkpIHJvdGF0ZSgwKSB0cmFuc2xhdGUoLTYwMCAtNjAwKSIgc3R5bGU9ImZpbGw6I2ZmZmZmZiI+PHN2ZyBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHg9IjBweCIgeT0iMHB4Ij48dGl0bGU+QXJ0Ym9hcmQgMzQ8L3RpdGxlPjxwYXRoIGQ9Ik02NCwwQTUyLDUyLDAsMCwwLDQ2LDEwMC44bDE0LjY4LDI1LjI3YTQsNCwwLDAsMCw2LjY0LDBMODIsMTAwLjhBNTIsNTIsMCwwLDAsNjQsMFpNNjIsODJhNCw0LDAsMSwxLDQtNEE0LDQsMCwwLDEsNjIsODJabTIwLDBhNCw0LDAsMSwxLDQtNEE0LDQsMCwwLDEsODIsODJaTTk3Ljc2LDQ1LjM3bC04LDIyQTQsNCwwLDAsMSw4Niw3MEg1OGE0LDQsMCwwLDEtMy43NS0yLjZMNDMuMjMsMzhIMzRhNCw0LDAsMCwxLDAtOEg0NmE0LDQsMCwwLDEsMy43NSwyLjZsMTEsMjkuNEg4My4ybDctMTkuMzdhNCw0LDAsMCwxLDcuNTIsMi43M1oiPjwvcGF0aD48L3N2Zz48L2c+PC9nPjwvc3ZnPg==" />
            Store Locator
        </div>
        {(props.cart) && 
        <Cart 
        getStoreState={() => props.getStoreState()}
        openCart={() => props.openCart()}
        closeCart={() => props.closeCart()}
        />}
    </div>

export default Header;