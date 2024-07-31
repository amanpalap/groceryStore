'use client'
import { remove } from '@/lib/store/features/cart/cartSlice'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks'

const Page = () => {
    const item = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()

    const handleRemove = (productId: any) => {
        dispatch(remove(productId))
        console.log('remove item')
    }

    return (
        item.map((item, idx) => (
            <div key={idx}>
                <h1>{item.names}</h1>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
        ))
    )
}

export default Page
