import { configureStore } from "@reduxjs/toolkit";
import  cartReducer  from "./contexts/Reducer";

export const store = configureStore({
    reducer : {
        cart : cartReducer
    },
})