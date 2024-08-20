'use client'
import { Input } from '@/components/ui/input';
import { remove, setAmount } from '@/lib/store/features/cart/cartSlice';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@radix-ui/react-label';



const Page = () => {
    const cartItems = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const amountHandler = (id: number, amount: number) => {
        dispatch(setAmount({ id, amount }));
    };

    const handleRemove = (productId: number) => {
        dispatch(remove(productId));
    };

    const amountIncrementor = (id: number, amount: number) => {
        if (amount < 0.5 && amount >= 0) {
            amountHandler(id, amount + 0.10);
        } else if (amount >= 0.5 && amount < 1) {
            amountHandler(id, amount + 0.25);
        } else if (amount >= 1 && amount < 10) {
            amountHandler(id, amount + 0.50);
        }
    };

    const amountDecrementor = (id: number, amount: number) => {
        if (amount <= 0.5 && amount > 0.1) {
            amountHandler(id, amount - 0.10);
        } else if (amount > 0.5 && amount <= 1) {
            amountHandler(id, amount - 0.25);
        } else if (amount > 1) {
            amountHandler(id, amount - 0.50);
        }
    };

    return (
        <div className='w-full grid p-8 full'>
            <h1 className='w-full font-extrabold text-5xl mb-8 text-center'>Your Cart</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8'>
                {cartItems.map((item, idx) => (
                    <div key={item.id} className='grid w-full bg-slate-800 rounded-3xl overflow-hidden my-4 '>
                        <div className="items-between justify-evenly w-full space-x-2 flex">
                            <div className='w-[55%]'>
                                <Image src={item.image} className="object-center w-full h-40" alt={`${item.names[0]} image`} width={"1000"} height={"1000"} />
                            </div>
                            <div className='flex w-[60%] flex-wrap py-1'>
                                <h3 className='text-lg overflow-hidden w-full'>
                                    {item.names[0]}
                                </h3>

                                <div className='w-full'>
                                    <Label className='ml-2 text-xs'>Weight</Label>
                                    <div className='flex items-center w-full'>
                                        <div className='flex w-[50%] items-center'>
                                            <Input
                                                className='w-full h-8 input-no-spinner'
                                                type="number"
                                                value={item.amount.toFixed(2) || ""}
                                                placeholder='0'
                                                onChange={(e) => amountHandler(item.id, Number(e.target.value))}
                                            />
                                            <span className='font-serif font-bold text-center'>/kg
                                            </span>
                                        </div>
                                        <div className='flex ml-2 w-[40%] rounded-lg overflow-hidden flex-wrap'>
                                            <ArrowUp strokeWidth={4} type="button"
                                                onClick={() => amountIncrementor(item.id, item.amount)}
                                                className='bg-white text-black p-1 flex jsutify-center items-center w-1/2' />
                                            <ArrowDown strokeWidth={4} type="button"
                                                onClick={() => amountDecrementor(item.id, item.amount)}
                                                className='bg-white p-1 text-black flex jsutify-center items-center w-1/2' />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="bg-red-500 px-5  rounded-xl hover:text-black"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            {cartItems.length > 0 ? (
                <Link
                    className="w-full mt-4 text-center bg-white rounded-xl py-4 font-mono font-extrabold text-2xl text-black"
                    type="submit"
                    href={'/user/placeorder'}
                >
                    CheckOut
                </Link>
            ) : (
                <p className="w-full mt-4 text-center bg-gray-200 rounded-xl py-4 font-mono font-extrabold text-2xl text-gray-500">
                    Your cart is empty
                </p>
            )}
        </div>
    );
}

export default Page;
