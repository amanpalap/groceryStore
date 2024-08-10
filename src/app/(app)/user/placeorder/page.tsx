'use client'
import { useAppSelector } from '@/lib/store/hooks/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Divide, Equal, X } from 'lucide-react';

const Page = () => {
    const cartItems = useAppSelector((state) => state.cart);
    const [isMounted, setIsMounted] = useState(false);
    const { data: session } = useSession();
    console.log(session)
    console.log(cartItems)
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='w-full grid p-8 full'>
            <h1 className='w-full font-extrabold text-5xl mb-8'>Place Order</h1>
            <div className='w-full px-4'>
                {session && session.user &&
                    (<div className='full font-mono text-red-500'>
                        <h3 className='text-xl font-extrabold text-red-300'>Address:</h3>
                        {session.user.address}
                        <div className='w-full'>
                            <span className='font-extrabold text-red-300'>Phone Number:</span> {session.user.number}
                        </div>
                    </div>)
                }

            </div>

            <div className='grid grid-cols-1'>
                {cartItems.map((item, idx) => (
                    <div key={item.id} className='grid w-full bg-slate-800 rounded-3xl overflow-hidden my-4 '>
                        <div className='flex items-center flex-wrap py-2 w-full'>
                            <span className='px-4 font-serif font-extrabold'>{idx + 1}.</span>
                            <div className='text-xl w-[95%] border border-white h-fit flex justify-between items-center flex-wrap'>
                                <div className='w-[80%] flex justify-end'>
                                    <span className='px-3'>{item.names[0]}</span>
                                    <span className='px-3 w-[10%] justify-end flex'>{item.price}/kg</span>
                                    <X strokeWidth={3} />
                                    <span className='px-3 justify-end flex w-[10%]'>{item.amount} kg</span>
                                    <Equal strokeWidth={3} />
                                    <span className='px-3 w-[10%] justify-end flex'>{(Number(item.price) * (item.amount)).toString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Page;
