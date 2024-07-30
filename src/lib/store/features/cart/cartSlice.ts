import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface cartState {
    items: object[]
}

const initialState: cartState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            state.items.push(action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { add } = cartSlice.actions

export default cartSlice.reducer