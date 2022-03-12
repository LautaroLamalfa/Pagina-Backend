import * as actionTypes from '../constants/cartConstants';
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/${id}`);

    dispatch({
        type: actionTypes.add_to_cart,
        payload: {
            product: data._id,
            name: data.nombre,
            price: data.precio,
            imageURL: data.imagen,
            qty
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.remove_from_cart,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
};

