'use client'
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Equal, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cartSchema } from '@/schemas/cartSchemas';
import * as z from 'zod';

const Page = () => {
    const cartItems = useAppSelector((state) => state.cart);
    const [isMounted, setIsMounted] = useState(false);
    const { data: session } = useSession();
    const [total, setTotal] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<z.infer<typeof cartSchema>>({
        resolver: zodResolver(cartSchema),
    });

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);

        // Dynamically import jsPDF on the client side
        const jsPDF = (await import('jspdf')).default;
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text('Order Summary', 20, 20);
        doc.text(`Customer: ${session?.user?.name || 'N/A'}`, 20, 30);
        doc.text(`Address: ${session?.user?.address || 'N/A'}`, 20, 40);
        doc.text(`Phone Number: ${session?.user?.number || 'N/A'}`, 20, 50);

        cartItems.forEach((item, idx) => {
            doc.text(`${idx + 1}. ${item.names[0]} - Price/kg: ₹${item.price}, Weight: ${item.amount} kg, Cost: ₹${(Number(item.price) * item.amount).toFixed(2)}`, 20, 60 + (idx * 10));
        });

        doc.text(`Total: ₹${total.toFixed(2)}`, 20, 70 + (cartItems.length * 10));
        doc.text('Disclaimer: Please review your order carefully before proceeding. Prices are subject to change based on market conditions.', 20, 80 + (cartItems.length * 10));

        // Save the PDF with a specific file name
        doc.save('order_summary.pdf');

        console.log('Submitted Data:', data);
        setIsSubmitting(false);
    };

    useEffect(() => {
        const calculatedTotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.amount), 0);
        if (calculatedTotal < 250) {
            setTotal(calculatedTotal + 50);
        } else {
            setTotal(calculatedTotal);
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
                {/* Heading Row */}
                <div className='flex items-center text-red-200 justify-between font-bold mb-4'>
                    <div className='lg:w-[50%] w-[30%] pl-6 lg:pl-0'>Name</div>
                    <div className='lg:w-[50%] w-[60%] flex flex-wrap justify-between'>
                        <div className='lg:w-1/3'>Price/kg</div>
                        <div className='lg:w-1/3 text-center '>Weight(kg)</div>
                        <div className='lg:w-1/3  text-right pr-2 '>Cost</div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="justify-between w-full flex flex-wrap">
                        {cartItems.map((item, idx) => (
                            <div key={item.id} className='grid w-full'>
                                <div className='flex items-center justify-between flex-wrap py-2 w-full'>
                                    <div className='flex items-center flex-wrap w-[40%] lg:w-[35%]'>
                                        <span className='lg:w-[2%] w-[9%] text-xs'>{idx + 1}.</span>
                                        <FormField
                                            name="name"
                                            control={form.control}
                                            render={({ field, fieldState: { error } }) => (
                                                <FormItem className="lg:px-3 w-[85%] lg:w-[90%] justify-end flex">
                                                    <Input
                                                        className='h-6 bg-slate-800'
                                                        {...field}
                                                        value={item.names[0]} />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='lg:w-[50%] w-[60%] flex flex-wrap justify-between  items-center'>
                                        <FormField
                                            name="price"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="lg:px-3 w-[30%] lg:w-[15%] justify-end flex">
                                                    <Input
                                                        className='h-6 bg-slate-800'
                                                        {...field}
                                                        value={item.price} />
                                                </FormItem>
                                            )}
                                        />
                                        <X size={15} strokeWidth={3} />
                                        <FormField
                                            name="weight"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="lg:px-3 w-[15%] justify-end flex">
                                                    <Input
                                                        className='h-6 bg-slate-800'
                                                        {...field}
                                                        value={item.amount} />
                                                </FormItem>
                                            )}
                                        />
                                        <Equal size={15} strokeWidth={3} />
                                        <FormField
                                            name="amount"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="lg:px-3 w-[30%] lg:w-[15%] w- justify-end flex">
                                                    <Input
                                                        className='h-6 text-right bg-slate-800'
                                                        {...field}
                                                        value={(Number(item.price) * item.amount).toFixed(2)} />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button className="lg:w-[89%] w-[87%] fixed bottom-2 py-4 text-xl bg-white rounded-xl text-black font-bold font-mono" type="submit">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                `Place Order (₹${total.toFixed(2)})`
                            )}
                        </Button>
                    </form>
                </Form>
                <div className='justify-end flex font-bold font-sans lg:px-3 mt-4 text-red-500'>
                    <span>Total: <span className='pl-2'>₹ {total.toFixed(2)}</span></span>
                </div>

            </div>
            <div className='w-full px-4 mb-4 flex justify-center flex-wrap'>
                {(total - 50) < 250 && <h3 className='text-green-700 text-xl animate-pulse duration-550 bg-white w-1/2 text-center mb-3 rounded-xl'>Delivery is free above ₹250</h3>}
                <div className='bg-yellow-100 text-yellow-700 p-4 rounded-lg w-full mb-8'>
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
        </div>
    );
}

export default Page;
