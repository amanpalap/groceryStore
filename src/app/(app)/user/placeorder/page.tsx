'use client'
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Equal, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf'; // Importing jsPDF directly
import 'jspdf-autotable'; // Import the autoTable plugin

const Page = () => {
    const cartItems = useAppSelector((state) => state.cart);
    const [isMounted, setIsMounted] = useState(false);
    const { data: session } = useSession();
    const [total, setTotal] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const doc = new jsPDF();

        // Add title and user information
        doc.setFontSize(20);
        doc.text('Order Summary', 14, 22);
        doc.setFontSize(12);
        doc.text(`Customer: ${session?.user?.name || 'N/A'}`, 14, 32);
        doc.text(`Address: ${session?.user?.address || 'N/A'}`, 14, 42);
        doc.text(`Phone Number: ${session?.user?.number || 'N/A'}`, 14, 52);

        // Table setup
        const tableData = cartItems.map((item, idx) => [
            idx + 1,
            item.names[0],
            `₹${item.price}`,
            item.amount,
            `₹${(Number(item.price) * item.amount).toFixed(2)}`
        ]);

        (doc as any).autoTable({
            head: [['#', 'Name', 'Price/kg', 'Weight(kg)', 'Cost']],
            body: tableData,
            startY: 60,
            theme: 'grid',
            headStyles: { fillColor: [44, 62, 80] },
            bodyStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                0: { cellWidth: 10 }, // S. No. column
                1: { cellWidth: 50 }, // Name column
                2: { cellWidth: 30, halign: 'right' }, // Price/kg column
                3: { cellWidth: 30, halign: 'right' }, // Weight(kg) column
                4: { cellWidth: 30, halign: 'right' }, // Cost column
            },
            styles: { fontSize: 10, font: "courier" },
        });

        // Total
        doc.setFontSize(14);
        doc.text(`Total: ₹${total.toFixed(2)}`, 14, (doc as any).lastAutoTable.finalY + 10);

        // Disclaimer
        doc.setFontSize(10);
        doc.text('Disclaimer:', 14, (doc as any).lastAutoTable.finalY + 20);
        doc.setFontSize(8);

        // Save the PDF with a specific file name
        doc.save('order_summary.pdf');

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

            <div className='grid grid-cols-1 z-20 bg-slate-800 rounded-xl my-4 p-4'>
                {/* Heading Row */}
                <div className='flex items-center text-red-200 justify-between font-bold mb-4'>
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
                            <div className='flex items-center -z-10 justify-between flex-wrap py-2 w-full'>
                                <div className='flex items-center flex-wrap w-[40%] lg:w-[35%]'>
                                    <span className='lg:w-[2%] w-[9%] text-xs'>{idx + 1}.</span>
                                    <div className="lg:px-3 w-[85%] lg:w-[90%] justify-end focus: flex">
                                        <Input
                                            className='h-6 bg-slate-800'
                                            name={`name-${idx}`}
                                            value={item.names[0]}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='lg:w-[50%] w-[60%] flex flex-wrap justify-between  items-center'>
                                    <div className="lg:px-3 w-[30%] lg:w-[15%] justify-end flex">
                                        <Input
                                            className='h-6 bg-slate-800'
                                            name={`price-${idx}`}
                                            value={item.price}
                                            readOnly
                                        />
                                    </div>
                                    <X size={15} strokeWidth={3} />
                                    <div className="lg:px-3 w-[15%] justify-end flex">
                                        <Input
                                            className='h-6 bg-slate-800'
                                            name={`weight-${idx}`}
                                            value={item.amount}
                                            readOnly
                                        />
                                    </div>
                                    <Equal size={15} strokeWidth={3} />
                                    <div className="lg:px-3 w-[30%] lg:w-[15%] justify-end flex">
                                        <Input
                                            className='h-6 disabled:opacity-100 text-right bg-slate-800'
                                            name={`amount-${idx}`}
                                            value={(Number(item.price) * item.amount).toFixed(2)}
                                            readOnly
                                        />
                                    </div>
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
