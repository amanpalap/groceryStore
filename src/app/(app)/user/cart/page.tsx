'use client'
import { remove, setAmount } from '@/lib/store/features/cart/cartSlice'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks'


const Page = () => {
    const cartItems = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    console.log(cartItems)

    const amountHandler = (id: number, amount: number) => {
        dispatch(setAmount({ id, amount }))
    }

    const handleRemove = (productId: number) => {
        dispatch(remove(productId))
        console.log('remove item')
    }

    return (
        <div className='w-full p-8'>
            <h1 className='w-full font-extrabold text-5xl mb-8'>Your Cart</h1>
            {cartItems.map((item, idx) => (
                <div
                    key={idx}
                    className='w-full'
                >
                    <div className="w-full px-8 flex-wrap items-center">
                        <h1 className='w-full border-2'>
                            {item.names[0]} ({item.names[1]})
                        </h1>
                        <input
                            className='text-black'
                            type="number"
                            value={item.amount}
                            onChange={(e) => amountHandler(item.id, Number(e.target.value))}
                            max={10}
                        />
                        <button className="bg-red-500" onClick={() => handleRemove(item.id)}>
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page
