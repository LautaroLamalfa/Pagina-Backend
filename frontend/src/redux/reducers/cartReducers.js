import * as actionTypes from "../constants/cartConstants"

export const cartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type) {
        case actionTypes.add_to_cart:
            const item = action.payload;
            
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item: x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case actionTypes.remove_from_cart:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        default:
            return state;
    }
};