import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    names: [string, string];
    price: string;
    image: string;
    category: string;
    amount: number;
}

const getInitialState = (): Product[] => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return JSON.parse(localStorage.getItem("cart") as string);
    }
    return [];
};

const initialState: Product[] = getInitialState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(current(state)));
        },
        remove: (state, action: PayloadAction<number>) => {
            const updatedState = state.filter(product => product.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(updatedState));
            return updatedState;
        },
        setAmount: (state, action: PayloadAction<{ id: number, amount: number }>) => {
            const updatedState = state.map(product =>
                product.id === action.payload.id ? { ...product, amount: action.payload.amount } : product
            );
            localStorage.setItem("cart", JSON.stringify(updatedState));
            return updatedState;
        }
    },
});

export const { add, remove, setAmount } = cartSlice.actions;
export default cartSlice.reducer;
