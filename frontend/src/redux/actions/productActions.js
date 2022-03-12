import * as actionTypes from '../constants/productConstants';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({type: actionTypes.get_products_request});

        const { data } = await axios.get("/api");

        dispatch({
            type: actionTypes.get_products_success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.get_products_fail,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const getProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.get_product_details_request});

        const { data } = await axios.get(`/api/${id}`);

        dispatch({
            type: actionTypes.get_product_details_success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.get_product_details_fail,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
};

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionTypes.get_products_details_reset
    })
};