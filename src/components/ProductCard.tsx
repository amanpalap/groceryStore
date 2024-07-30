import { add } from '@/lib/store/features/cart/cartSlice';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { IndianRupee, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: number;
    names: [string, string];
    price: string;
    image: string;
    category: string;
}

export default function ProductCard() {
    const dispatch = useAppDispatch
    const products: Product[] = [
        { id: 1, names: ["Carrot", "गाजर"], price: "40/kg", image: "", category: "Vegetables" },
        { id: 2, names: ["Radish", "मूली"], price: "25/kg", image: "", category: "Vegetables" },
        { id: 3, names: ["Brinjal", "बैंगन"], price: "45/kg", image: "", category: "Vegetables" },
        { id: 4, names: ["Onion", "प्याज"], price: "35/kg", image: "", category: "Vegetables" },
        { id: 5, names: ["Garlic", "लहसुन"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 6, names: ["Potato", "आलू"], price: "30/kg", image: "", category: "Vegetables" },
        { id: 7, names: ["Tomato", "टमाटर"], price: "50/kg", image: "", category: "Vegetables" },
        { id: 8, names: ["Spinach", "पालक"], price: "20/kg", image: "", category: "Vegetables" },
        { id: 9, names: ["Cauliflower", "फूलगोभी"], price: "55/kg", image: "", category: "Vegetables" },
        { id: 10, names: ["Cucumber", "खीरा"], price: "30/kg", image: "", category: "Vegetables" },
        { id: 11, names: ["Green Beans", "हरी फली"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 12, names: ["Pumpkin", "कद्दू"], price: "40/kg", image: "", category: "Vegetables" },
        { id: 13, names: ["Capsicum", "शिमला मिर्च"], price: "50/kg", image: "", category: "Vegetables" },
        { id: 14, names: ["Beetroot", "चुकंदर"], price: "35/kg", image: "", category: "Vegetables" },
        { id: 15, names: ["Methi (Fenugreek)", "मेथी"], price: "40/kg", image: "", category: "Vegetables" },
        { id: 16, names: ["Ginger", "अदरक"], price: "80/kg", image: "", category: "Vegetables" },
        { id: 17, names: ["Okra (Lady Finger)", "भिंडी"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 18, names: ["Bottle Gourd", "lauki", "लौकी"], price: "35/kg", image: "", category: "Vegetables" },
        { id: 19, names: ["Cabbage", "पत्ता गोभी"], price: "30/kg", image: "", category: "Vegetables" },
        { id: 20, names: ["Sweet Potato", "शकरकंद"], price: "40/kg", image: "", category: "Vegetables" },
        { id: 21, names: ["French Beans", "फ्रेंच बीन्स"], price: "70/kg", image: "", category: "Vegetables" },
        { id: 22, names: ["Karela (Bitter Gourd)", "करेला"], price: "55/kg", image: "", category: "Vegetables" },
        { id: 23, names: ["Tori (Ridge Gourd)", "तोरी"], price: "45/kg", image: "", category: "Vegetables" },
        { id: 24, names: ["Green Peas", "हरी मटर"], price: "80/kg", image: "", category: "Vegetables" },
        { id: 25, names: ["Chili", "मिर्च"], price: "70/kg", image: "", category: "Vegetables" },
        { id: 26, names: ["Arbi (Taro Root)", "अरबी"], price: "50/kg", image: "", category: "Vegetables" },
        { id: 27, names: ["Celery", "सेलेरी"], price: "90/kg", image: "", category: "Vegetables" },
        { id: 28, names: ["Green Chili", "हरी मिर्च"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 29, names: ["Radish Leaves", "मूली के पत्ते"], price: "30/kg", image: "", category: "Vegetables" },
        { id: 30, names: ["Turnip", "शलगम"], price: "40/kg", image: "", category: "Vegetables" },
        { id: 31, names: ["Coriander Leaves", "धनिया"], price: "50/kg", image: "", category: "Vegetables" },
        { id: 32, names: ["Mint Leaves", "पुदीना"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 33, names: ["Leek", "लीक"], price: "90/kg", image: "", category: "Vegetables" },
        { id: 34, names: ["Asparagus", "अस्पैरेगस"], price: "120/kg", image: "", category: "Vegetables" },
        { id: 35, names: ["Napa Cabbage", "नापा गोभी"], price: "40/kg", image: "", category: "Vegetables" },
        { id: 36, names: ["Shallots", "छोटे प्याज"], price: "70/kg", image: "", category: "Vegetables" },
        { id: 37, names: ["Curry Leaves", "करी पत्ते"], price: "80/kg", image: "", category: "Vegetables" },
        { id: 38, names: ["Dill Leaves", "सौंपा"], price: "50/kg", image: "", category: "Vegetables" },
        { id: 39, names: ["Chayote", "चायोट"], price: "90/kg", image: "", category: "Vegetables" },
        { id: 40, names: ["Gourd", "घिया"], price: "45/kg", image: "", category: "Vegetables" },
        { id: 41, names: ["Fennel", "सौंफ"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 42, names: ["Kohlrabi", "कोलरबी"], price: "50/kg", image: "", category: "Vegetables" },
        { id: 43, names: ["Tamarind Leaves", "इमली के पत्ते"], price: "40/kg", image: "", category: "Vegetables" },
        { id: 44, names: ["Chickpea Leaves", "चने के पत्ते"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 45, names: ["Yam", "सुरन"], price: "70/kg", image: "", category: "Vegetables" },
        { id: 46, names: ["Bitter Gourd Leaves", "करेला के पत्ते"], price: "55/kg", image: "", category: "Vegetables" },
        { id: 47, names: ["Kachri", "कचरी"], price: "50/kg", image: "", category: "Vegetables" },
        { id: 48, names: ["Cucumber Leaves", "खीरे के पत्ते"], price: "30/kg", image: "", category: "Vegetables" },
        { id: 49, names: ["Lotus Stem", "कमल ककड़ी"], price: "80/kg", image: "", category: "Vegetables" },
        { id: 50, names: ["Jute Leaves", "पौष्टिक पत्ते"], price: "60/kg", image: "", category: "Vegetables" },
        { id: 51, names: ["Moringa Leaves", "सहजन के पत्ते"], price: "70/kg", image: "", category: "Vegetables" }
    ];

    const handleAddToCart = (product: Product) => {
        try {
            dispatch(add(product)); // Ensure you're passing the correct payload
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } // Ensure you're passing the correct payload
    };

    return (
        products.map((item) => (
            <div key={item.id} className='flex flex-wrap space-y-2 rounded-3xl overflow-hidden my-8 mx-8 border-8'>
                <Image src={item.image} alt={item.names[0]} width={200} height={200} className="h-52 object-cover" />
                <div className='flex flex-wrap w-full items-center justify-between px-3'>
                    <h2 className='w-full'>{item.names[0]}</h2>
                    <h2>( {item.names[1]} )</h2>
                </div>
                <div className='flex w-full pl-3 justify-between items-center'>
                    <p className='flex items-center'><IndianRupee size={16} />{item.price}</p>
                    <button
                        className='bg-green-500 rounded-tl-3xl px-3 justify-between py-2 flex'
                        onClick={() => handleAddToCart(item)}
                    >
                        Add to <ShoppingCart />
                    </button>
                </div>

            </div >
        ))
    )
}