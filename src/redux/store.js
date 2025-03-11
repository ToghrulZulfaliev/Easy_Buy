import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/CartSlice";

const preloadedState = {
    cart: {
        items: localStorage.getItem('cartItems_guest')
            ? JSON.parse(localStorage.getItem('cartItems_guest'))
            : [],
        totalQuantity: 0,
        totalAmount: 0,
        loading: false
    }
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
    preloadedState,
});