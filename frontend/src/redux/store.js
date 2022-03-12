import { createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers'
import { getProductDetailReducer, getProductsReducer } from './reducers/productReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductsReducer,
    getProductsDetails: getProductDetailReducer,
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store