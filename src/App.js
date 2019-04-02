import React from 'react';
import CategoryWrapper from './Components/Category/CategoryWrapper';
import Map from './Components/Maps/Map';
import Store from './Components/Store/Store'
import {  Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Route exact path="/" component={CategoryWrapper} />
            <Route exact path="/:category" component={Map} />
        </div>
    );
}

export default App;

