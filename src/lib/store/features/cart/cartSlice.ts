import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    names: [string, string];
    price: string;
    image: string;
    category: string;
    amount: number
}

const initialState: Product[] = JSON.parse(localStorage.getItem("cart") as string) || [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
            let cartItems = JSON.stringify(current(state))
            localStorage.setItem("cart", cartItems)

        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(product => product.id !== action.payload);
        },
        setAmount: (state, action: PayloadAction<{ id: number, amount: number }>) => {
            state.forEach(product => {
                if (product.id === action.payload.id) {
                    product.amount = action.payload.amount;
                }
            });
        }
        // other reducers can be added here
    },
});

export const { add, remove, setAmount } = cartSlice.actions;
export default cartSlice.reducer;
