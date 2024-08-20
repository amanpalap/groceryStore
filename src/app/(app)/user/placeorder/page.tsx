'use client'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Equal, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { clear } from '@/lib/store/features/cart/cartSlice';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { userUpdateSchemas } from '@/schemas/userUpdateSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiResponse } from '@/types/ApiResponse';
import { UserData } from '@/types/UserData';
import Link from 'next/link';


interface CartItem {
    name: string;
    price: string;
    amount: number;
    cost: string;
}

interface FormData {
    customer: string;
    address: string;
    phoneNumber: string;
    cartItems: CartItem[];
    total: string;
}

const Page = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cart);
    const [isMounted, setIsMounted] = useState(false);
    const { data: session, update } = useSession();
    const [total, setTotal] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const { toast } = useToast()
    const router = useRouter()
    const [data, setData] = useState<UserData | null>(null)

    const form = useForm<z.infer<typeof userUpdateSchemas>>({
        resolver: zodResolver(userUpdateSchemas),
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            number: '',
            email: '',
        }
    })


    const { reset } = form;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleData = async () => {
            try {
                const response = await axios.get('/api/profile')
                const data = response.data.data
                setData(data)
                reset(data)
            } catch (error) {
                console.log("Error while login", error)

                let axiosError = error as AxiosError<ApiResponse>

                let errorMessage = axiosError.response?.data.message ||
                    ('There was error while getting profile. Please try again.');

                toast({
                    title: 'Updation Failed',
                    description: errorMessage,
                    variant: 'destructive',
                });
            }
        }
        handleData()
    }, [reset])

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = {
            customer: (data?.firstName! + data?.lastName) || 'N/A',
            address: data?.address || 'N/A',
            phoneNumber: data?.number || 'N/A',
            cartItems: cartItems.map(item => ({
                name: item.names[0],
                price: `₹${item.price}`,
                amount: item.amount,
                cost: `₹${(Number(item.price) * item.amount).toFixed(2)}`
            })),
            total: `₹${total.toFixed(2)}`
        };

        setSubmittedData(formData);
        console.log("1", submittedData)

        try {
            const response = await axios.post('/api/cart', formData);
            console.log("response:", response)
            toast({
                title: 'Order placed successfully',
                description: "Your order has been successfully placed.",
            });
            dispatch(clear())
            // router.replace('/home')
            console.log(formData);

        } catch (error) {
            console.error("Error placing order", error);

            const axiosError = error as AxiosError;
            // const errorMessage = axiosError.response?.data.message ||
            // 'There was a problem placing your order. Please try again.';

            toast({
                title: 'Order Placement Failed',
                description: "faled to place order",
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log(session)

    useEffect(() => {
        const calculatedTotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.amount), 0);
        if (calculatedTotal < 250 && calculatedTotal > 0) {
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
                {data &&
                    (<div className='w-full text-sm flex-wrap items-center flex justify-between text-red-500 border-2'>
                        <h3 className='font-extrabold text-red-300'>Address: </h3>
                        <Link className='text-sm bg-white font-extrabold px-2 rounded text-black py-0.5' href={'/user/profile'}>Change Address
                        </Link>
                        <p className='w-full'>{data?.address || 'N/A'}</p>
                        <div className='w-full'>
                            <span className='font-extrabold text-red-300'>Phone Number:</span> {data?.number || 'N/A'}
                        </div>
                    </div>)
                }
            </div>

            <div className='grid grid-cols-1 z-20 bg-slate-800 rounded-xl my-4 p-4'>
                {/* Heading Row */}
                <div className='flex lg:text-md text-xs items-center text-red-200 justify-between font-extrabold mb-4'>
                    <div className='lg:w-[50%] w-[30%] pl-6 lg:pl-0'>Name</div>
                    <div className='lg:w-[50%] w-[60%] flex flex-wrap justify-between'>
                        <div className='lg:w-1/3'>Price/kg</div>
                        <div className='lg:w-1/3 text-center '>Weight(kg)</div>
                        <div className='lg:w-1/3  text-right pr-2 '>Cost</div>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="justify-between w-full flex flex-wrap bg-transparent z-50">
                    {cartItems.map((item, idx) => (
                        <div key={item.id} className='grid w-full'>
                            <div className='flex items-center -z-10 justify-between flex-wrap py-2 w-full text-xs'>
                                <div className='flex items-center flex-wrap w-[40%] lg:w-[35%]'>
                                    <span className='lg:w-[2%] w-[9%] text-xs'>{idx + 1}.</span>
                                    <div className="lg:px-3 w-[85%] lg:w-[90%] justify-end focus: flex">
                                        <Input
                                            className='h-6 text-xs bg-slate-800'
                                            name={`name-${idx}`}
                                            value={item.names[0]}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='lg:w-[50%] w-[60%] flex flex-wrap justify-between  items-center'>
                                    <div className="lg:px-3 w-[20%] lg:w-[15%] justify-end flex">
                                        <Input
                                            className='h-6 text-xs bg-slate-800'
                                            name={`price-${idx}`}
                                            value={(item.price)}
                                            readOnly
                                        />
                                    </div>
                                    <X size={15} strokeWidth={3} />
                                    <div className="lg:px-3 w-[25%] justify-end flex">
                                        <Input
                                            className='h-6 text-xs w-full bg-slate-800'
                                            name={`weight-${idx}`}
                                            value={item.amount.toFixed(2)}
                                            readOnly
                                        />
                                    </div>
                                    <Equal size={15} strokeWidth={3} />
                                    <div className="lg:px-3 w-[30%] lg:w-[15%] justify-end flex">
                                        <Input
                                            className='h-6 disabled:opacity-100 text-right text-xs bg-slate-800'
                                            name={`amount-${idx}`}
                                            value={(Number(item.price) * item.amount).toFixed(2)}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {total > 0 && <Button className="lg:w-[89%] w-[83%] fixed bottom-2 py-4 text-xl bg-white rounded-xl text-black font-bold font-mono self-center" type="submit">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            `Place Order (₹${total.toFixed(2)})`
                        )}
                    </Button>}
                </form>

                <div className='justify-end flex font-bold font-sans lg:px-3 mt-4 text-red-500'>
                    <span>Total: <span className='pl-2'>₹ {total.toFixed(2)}</span></span>
                </div>
            </div>

            <div className='w-full px-4 mb-4 flex justify-center flex-wrap'>
                {(total - 50) < 250 && <h3 className='text-green-700 text-xl animate-pulse duration-550 bg-white w-full font-extrabold lg:w-1/2 text-center mb-3 rounded-xl'>Delivery is free above ₹250</h3>}
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
