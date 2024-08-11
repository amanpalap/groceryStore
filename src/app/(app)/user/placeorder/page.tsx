'use client'
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Equal, X } from 'lucide-react';


const Page = () => {
    const cartItems = useAppSelector((state) => state.cart);
    const [isMounted, setIsMounted] = useState(false);
    const { data: session } = useSession();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = () => {
        //setup handle submit
    }

    useEffect(() => {
        const calculatedTotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.amount), 0);
        if (calculatedTotal < 250) {
            setTotal(calculatedTotal + 50)
        } else {
            setTotal(calculatedTotal)
        }
    }, [cartItems]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='w-full grid lg:p-8 p-4 full'>
            <h1 className='w-full font-extrabold text-5xl mb-8 text-center'>Placing Order</h1>
            <div className='w-full px-4'>
                {session && session.user &&
                    (<div className='full font-mono text-red-500'>
                        <h3 className='text-xl font-extrabold text-red-300'>Address:</h3>
                        {session.user.address || 'N/A'}
                        <div className='w-full'>
                            <span className='font-extrabold text-red-300'>Phone Number:</span> {session.user.number || 'N/A'}
                        </div>
                    </div>)
                }
            </div>

            <div className='grid grid-cols-1 bg-slate-800 rounded-xl my-4 p-4'>
                <div className='w-full flex justify-between text-red-200 font-bold font-sans text-md mb-2'>
                    <span className='text-red-200 font-black lg:w-[25%] w-[30%] ml-14'>Name</span>
                    <div className='flex lg:justify-end w-[50%] lg:w-[50%] justify-between'>
                        <span className='lg:w-[15%]'>Price/kg</span>
                        <span className='lg:w-[20%]'>Weight(kg)</span>
                        <span className='lg:w-[7%]'>Cost</span>
                    </div>
                </div>
                {cartItems.map((item, idx) => (
                    <div key={item.id} className='grid w-full'>
                        <div className='flex items-center justify-between flex-wrap py-2 w-full'>
                            <div className='lg:w-[25%] w-[50%]'>
                                <span className='px-4 font-serif font-extrabold w-[4%]'>{idx + 1}.</span>
                                <span className='px-3'>{item.names[0]}</span>
                            </div>

                            <div className='w-[50%] text-center flex justify-end'>
                                <span className='lg:px-3 w-[30%] lg:w-[10%] justify-end flex'>{item.price}</span>
                                <X strokeWidth={3} />
                                <span className='lg:px-3 justify-end flex w-[25%] lg:w-[15%]'>{item.amount} kg</span>
                                <Equal strokeWidth={3} />
                                <span className='lg:px-3 lg:w-[15%] w-[30%] justify-end flex'>{(Number(item.price) * item.amount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='justify-end flex font-bold font-sans lg:px-3 mt-4 text-red-500'>
                    <span className=''>Total: <span className='pl-2'>₹ {total.toFixed(2)}</span></span>
                </div>

            </div>
            <div className='w-full px-4 mb-4 flex justify-center flex-wrap'>
                {(total - 50) < 250 && <h3 className='text-green-700 text-xl animate-pulse duration-550 bg-white w-1/2 text-center mb-3 rounded-xl'>Delivery is free above ₹250</h3>}
                <div className='bg-yellow-100 text-yellow-700 p-4 rounded-lg w-full'>
                    <h3 className='font-bold text-lg mb-2'>Disclaimer</h3>
                    <p className='text-sm'>
                        Please review your order carefully before proceeding. Prices are subject to change based on market conditions.
                        The total cost displayed may vary due to weight approximations or additional charges. If any discrepancies occur,
                        you will be notified prior to order confirmation.
                    </p>
                    <p className='text-sm mt-2'>
                        By placing your order, you agree to our Terms and Conditions and acknowledge that all sales are final once confirmed. Please contact customer support if you have any questions or concerns.
                    </p>
                </div>
            </div>
            <button className="w-full py-4 text-xl bg-white rounded-xl text-black font-bold font-mono" onSubmit={() => handleSubmit}>
                Place Order (₹{total.toFixed(2)})
            </button>
            {console.log(cartItems)!}
        </div>
    );
}

export default Page;
