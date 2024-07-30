'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store/store'
import { add } from '@/lib/store/features/cart/cartSlice'

export default function StoreProvider({
    children,
}: {
    productId: number
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        storeRef.current.dispatch(add("productId"))

    }

    return <Provider store={storeRef.current}>{children}</Provider>
}