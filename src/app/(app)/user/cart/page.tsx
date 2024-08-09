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
            amountHandler(id, amount + 0.1);
        } else if (amount >= 0.5 && amount < 1) {
            amountHandler(id, amount + 0.25);
        } else if (amount >= 1 && amount < 10) {
            amountHandler(id, amount + 0.5);
        }
    };

    const amountDecrementor = (id: number, amount: number) => {
        if (amount <= 0.5 && amount > 0) {
            amountHandler(id, amount - 0.1);
        } else if (amount > 0.5 && amount <= 1) {
            amountHandler(id, amount - 0.25);
        } else if (amount > 1) {
            amountHandler(id, amount - 0.5);
        }
    };

    return (
        <div className='w-full grid p-8'>
            <h1 className='w-full font-extrabold text-5xl mb-8'>Your Cart</h1>
            {cartItems.map((item, idx) => (
                <div key={item.id} className='flex w-[45%] flex-wrap border-2'>
                    <div className="items-between border-2 space-x-10 flex">
                        <Image src={item.image} className="rounded-l-xl w-52 h-32 aspect-square" alt={`${item.names[0]} image`} width={"100"} height={"100"} />

                        <div className='flex flex-wrap'>
                            <h3 className='text-2xl h-fit'>
                                {item.names[0]} ({item.names[1]})
                            </h3>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="justify-between w-full border-2 flex flex-wrap">
                                    <FormField
                                        name="weight"
                                        control={form.control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormItem className='flex flex-wrap h-fit'>
                                                <FormLabel>Weight</FormLabel>
                                                <FormControl className='w-full'>
                                                    <div className='flex justify-between items-center'>
                                                        <Input
                                                            className='w-20 input-no-spinner'
                                                            {...field}
                                                            type="number"
                                                            value={item.amount.toFixed(2) || ""}
                                                            placeholder='0'
                                                            onChange={(e) => amountHandler(item.id, Number(e.target.value))}
                                                        />
                                                        <span>/kg</span>
                                                        <div className='border-2 flex w-10 rounded-lg overflow-hidden flex-wrap'>
                                                            <ArrowUp type="button"
                                                                onClick={() => amountIncrementor(item.id, item.amount)}
                                                                className='bg-white text-black flex jsutify-center items-center h-5 w-full' />
                                                            <ArrowDown type="button"
                                                                onClick={() => amountDecrementor(item.id, item.amount)}
                                                                className='bg-white text-black flex jsutify-center items-center h-5 w-full' />
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
    );
}

export default Page;
