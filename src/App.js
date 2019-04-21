import React from 'react';
import { Route } from 'react-router-dom';
import CategoryWrapper from './Components/Category/CategoryWrapper';
import MapComponent from './Components/Maps/Map';
import Store from './Components/Store/Store';
import Checkout from './Components/Checkout/Checkout';
import Payment from './Components/Payment/Payment';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';

const App = () =>
     <div style={{ "minHeight": "calc(100vh)", "position": "relative", "height": "max-content" }}>
          <Route path="/" component={Header} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={CategoryWrapper} />
          <Route exact path="/:category" component={MapComponent} />
          <Route exact path="/:category/:storeID" component={Store} />
          <Route exact path="/:category/:storeID/checkout" component={Checkout} />
          <Route path="/" component={Footer} />
     </div>


export default App;

