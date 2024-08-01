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
        <div className='w-full p-8'>
            <h1 className='w-full font-extrabold text-5xl mb-8'>Your Cart</h1>
            {item.map((item, idx) => (
                <div
                    key={idx}
                    className='w-full'
                >
                    <div className="w-full px-8fllex-wrap items-center ">
                        <h1 className='w-full border-2'>
                            {item.names[0]} ({item.names[1]})
                        </h1>
                        <button className=" bg-red-500" onClick={() => handleRemove(item.id)}>
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page
