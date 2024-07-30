// cartSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    names: [string, string];
    price: string;
    image: string;
    category: string;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as Product[],
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
        },
        // other reducers
    },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
