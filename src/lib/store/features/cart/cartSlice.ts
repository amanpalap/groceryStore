import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    names: [string, string];
    price: string;
    image: string;
    category: string;
}

const initialState: Product[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(product => product.id !== action.payload);
        },
        // other reducers can be added here
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
