'use client'
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/components/ui/use-toast';


interface ItemData {
    name: string
    price: string
    amount: number
    cost: string
}

interface OrderData {
    id: number;
    customer: string
    address: string
    phoneNumber: string
    cartItems: ItemData[]
    total: string
    orderDate: Date
}

const Page = () => {
    const { toast } = useToast()
    const [data, setData] = useState<OrderData[]>([])
    useEffect(() => {
        const handleData = async () => {
            try {
                const response = await axios.get('/api/orders')
                setData(response.data.data)
            } catch (error) {
                console.log("error getting orders", error)
                let axiosError = error as AxiosError<ApiResponse>

                let errorMessage = axiosError.response?.data.message || ('There was error while getting orders.');

                toast({
                    title: 'Data Retrieval failed',
                    description: errorMessage,
                    variant: 'destructive',
                });

            }
        }
        handleData()
    }, [])
    return (
        <div className='w-full grid p-2'>
            <h1 className='w-full font-extrabold text-5xl mb-8 text-center'>Your Orders</h1>
            <div className='grid grid-cols-1 gap-x-8 w-full border-2'>
                {data.map((user, idx) => (
                    <div key={idx} className='grid w-full bg-slate-800 rounded-3xl overflow-hidden my-4 p-2'>
                        <div className='flex flex-wrap py-1 w-full'>
                            <div className='w-full bg-black rounded-xl p-2 mb-2'>
                                <p className='w-full'>
                                    {user.customer}
                                </p>
                                <p className='w-full'>
                                    {user.address}
                                </p>
                                <p className='w-full'>
                                    {user.phoneNumber}
                                </p>
                            </div>
                            <div className='w-full text-center text-red-500 font-extrabold'>
                                ORDERS:
                            </div>
                            <div className='w-full bg-slate-900 py-2 px-1 rounded-xl'>
                                {user.cartItems.map((item, idx) => (
                                    <div key={idx} className='flex flex-wrap items-center justify-between py-1 text-sm'>
                                        <p className='w-[4%] '>
                                            {idx + 1}.
                                        </p>
                                        <p className='w-[40%] '>
                                            {item.name}
                                        </p>
                                        <p className='w-[18%] text-center'>
                                            {item.price}
                                        </p>
                                        <p className='w-[18%] text-center'>
                                            {item.cost}
                                        </p>
                                        <p className='w-[18%] text-center'>
                                            {item.amount}kg
                                        </p>
                                    </div>
                                ))}
                                <p className='w-full text-right pr-4 mt-2'>Total: {user.total}</p>
                            </div>

                            <button
                                type="button"
                                className="bg-green-500 px-5 h-10 rounded-xl hover:text-black w-full mt-2"
                            // onClick={() => handleRemove(item.id)}
                            >
                                delivered
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
