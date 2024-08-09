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
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                return JSON.parse(storedCart);
            } catch (e) {
                console.error("Failed to parse cart from localStorage:", e);
                localStorage.removeItem("cart");
            }
        }
    }
    return [];
};


const initialState: Product[] = getInitialState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            const updatedState = [...state, action.payload];
            localStorage.setItem("cart", JSON.stringify(updatedState));
            return updatedState;
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
