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
        // other reducers can be added here
    },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
