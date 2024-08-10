'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { remove, setAmount } from '@/lib/store/features/cart/cartSlice';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks';
import { useForm } from 'react-hook-form';
import { cartSchema } from '@/schemas/cartSchemas';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const Page = () => {
    const cartItems = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const [isMounted, setIsMounted] = useState(false);

    const form = useForm<z.infer<typeof cartSchema>>({
        resolver: zodResolver(cartSchema),
        defaultValues: {
            weight: 0,
        },
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onSubmit = () => {
        // Handle form submission
    };

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
            <h1 className='w-full font-extrabold text-5xl mb-8'>Your Cart</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8'>
                {cartItems.map((item, idx) => (
                    <div key={item.id} className='grid w-full bg-slate-800 rounded-3xl overflow-hidden my-4 '>
                        <div className="items-between justify-evenly w-full space-x-5 flex">
                            <div className='w-[40%]'>
                                <Image src={item.image} className="object-center w-full h-40" alt={`${item.names[0]} image`} width={"1000"} height={"1000"} />
                            </div>
                            <div className='flex w-[60%] flex-wrap py-2'>
                                <h3 className='text-2xl h-fit'>
                                    {item.names[0]}
                                </h3>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="justify-between w-full flex flex-wrap">
                                        <FormField
                                            name="weight"
                                            control={form.control}
                                            render={({ field, fieldState: { error } }) => (
                                                <FormItem className='flex flex-wrap h-fit w-full'>
                                                    <FormLabel className='ml-2'>Weight</FormLabel>
                                                    <FormControl className='w-full'>
                                                        <div className='flex items-center w-full px-2'>
                                                            <div className='flex w-[30%]'>
                                                                <Input
                                                                    className='w-[70%] input-no-spinner '
                                                                    {...field}
                                                                    type="number"
                                                                    value={item.amount.toFixed(2) || ""}
                                                                    placeholder='0'
                                                                    onChange={(e) => amountHandler(item.id, Number(e.target.value))}
                                                                />
                                                                <span className='font-serif font-bold'>/kg
                                                                </span>
                                                            </div>
                                                            <div className='flex ml-2 w-[20%] rounded-lg overflow-hidden flex-wrap'>
                                                                <ArrowUp strokeWidth={4} type="button"
                                                                    onClick={() => amountIncrementor(item.id, item.amount)}
                                                                    className='bg-white text-black p-1 flex jsutify-center items-center w-1/2' />
                                                                <ArrowDown strokeWidth={4} type="button"
                                                                    onClick={() => amountDecrementor(item.id, item.amount)}
                                                                    className='bg-white p-1 text-black flex jsutify-center items-center w-1/2' />
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                    {error?.message && <FormMessage className="text-xs">{error.message}</FormMessage>}
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>

                                <button
                                    type="button"
                                    className="bg-red-500 px-5 rounded-xl hover:text-black"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
