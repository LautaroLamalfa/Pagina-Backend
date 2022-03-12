import * as actionTypes from '../constants/productConstants'

export const getProductsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case actionTypes.get_products_request:
            return {
                loading: true,
                products: []
            }
                case actionTypes.get_products_success:
            return {
                loading: false,
                products: action.payload
            }
        case actionTypes.get_products_fail: 
            return {
                loading: false,
                Error: action.payload
            }
        default:
            return state;
    }
};

export const getProductDetailReducer = (state = {products: {}}, action) => {
    switch (action.type) {
        case actionTypes.get_product_details_request:
            return {
                loading: true,
            }
        case actionTypes.get_product_details_success :
            return {
                loading: false,
                product: action.payload,
            }
        case actionTypes.get_product_details_fail :
            return {
                loading: false,
                Error: action.payload
            }
        case actionTypes.get_products_details_reset :
            return {
                product: {}
            }
        default:
            return state
    }
}