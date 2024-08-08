'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { remove, setAmount } from '@/lib/store/features/cart/cartSlice'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { cartSchema } from '@/schemas/cartSchemas'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const Page = () => {
    const cartItems = useAppSelector((state) => state.cart) // Assuming cart is an object with an 'items' array
    const dispatch = useAppDispatch()

    const form = useForm<z.infer<typeof cartSchema>>({
        resolver: zodResolver(cartSchema),
        defaultValues: {
            weight: 0
        }
    })

    const onSubmit = () => {
        // Handle form submission
    }

    const amountHandler = (id: number, amount: number) => {
        dispatch(setAmount({ id, amount }))
    }

    const handleRemove = (productId: number) => {
        dispatch(remove(productId))
        console.log('Removed item')
    }

    const amountIncrementor = (id: number, amount: number) => {
        if (amount < 0.5 && amount >= 0) {
            amountHandler(id, amount + 0.1)
        } else if (amount >= 0.5 && amount < 1) {
            amountHandler(id, amount + 0.25)
        } else if (amount >= 1 && amount < 10) {
            amountHandler(id, amount + 0.5)
        }

    }

    const amountDecrementor = (id: number, amount: number) => {
        if (amount <= 0.5 && amount > 0) {
            amountHandler(id, amount - 0.1)
        } else if (amount > 0.5 && amount <= 1) {
            amountHandler(id, amount - 0.25)
        } else if (amount > 1) {
            amountHandler(id, amount - 0.5)
        }
    }

    return (
        <div className='w-full p-8'>
            <h1 className='w-full font-extrabold text-5xl mb-8'>Your Cart</h1>
            {cartItems.map((item, idx) => (
                <div key={idx} className='w-full'>
                    <div className="w-full px-8 flex-wrap items-center">
                        <h1 className='w-full border-2'>
                            {item.names[0]} ({item.names[1]})
                        </h1>
                        {/* this */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="justify-between flex flex-wrap">

                                <FormField
                                    name="weight"
                                    control={form.control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormItem className="w-14">
                                            <FormLabel>Weight</FormLabel>
                                            <FormControl>
                                                <div>
                                                    <Input
                                                        className='input-no-spinner'
                                                        {...field}
                                                        type="number"
                                                        value={item.amount || ""}
                                                        placeholder=''
                                                        onChange={(e) => amountHandler(item.id, Number(e.target.value))}
                                                    />
                                                    <div>
                                                        <button
                                                            onClick={() => amountIncrementor(item.id, item.amount)}
                                                            className='bg-white text-black w-8'
                                                        >
                                                            ^
                                                        </button>
                                                        <button
                                                            onClick={() => amountDecrementor(item.id, item.amount)}
                                                            className='bg-white text-black w-8'
                                                        >
                                                            v
                                                        </button>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            {error?.message && <FormMessage className="text-xs"> {error.message}</FormMessage>}
                                        </FormItem>
                                    )}
                                />

                            </form>
                        </Form>
                        {/* this */}
                        <button
                            className="bg-red-500"
                            onClick={() => handleRemove(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page
