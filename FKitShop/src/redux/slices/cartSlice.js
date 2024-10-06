import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: "cartProducts",
    initialState: {
        CartArr: []
    },
    reducers: {
        addProduct: (state, action) => {
            const cartProductIndex = state.CartArr.findIndex(p => p.id === action.payload.id);

            if (cartProductIndex === -1) {
                state.CartArr.push({ ...action.payload, quantity: 1 });
            } else {
                state.CartArr[cartProductIndex].quantity += 1;
            }
        },
        deleteProduct: (state, action) => {
            const cartProductIndexRemove = action.payload.id;
            state.CartArr = state.CartArr.filter(item => item.id !== cartProductIndexRemove);
        },
        increaseQuantity: (state, action) => {
            const cartProductIndex = state.CartArr.findIndex(p => p.id === action.payload.id);
            if (cartProductIndex !== -1) {
                state.CartArr[cartProductIndex].quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const cartProductIndex = state.CartArr.findIndex(p => p.id === action.payload.id);
            if (cartProductIndex !== -1 && state.CartArr[cartProductIndex].quantity > 1) {
                state.CartArr[cartProductIndex].quantity -= 1;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, increaseQuantity, decreaseQuantity } = CartSlice.actions;

export default CartSlice.reducer;