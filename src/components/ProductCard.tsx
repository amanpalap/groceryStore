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
    const dispatch = useAppDispatch()

    type Product = {
        id: number;
        names: string[];
        price: string;
        image: string;
        category: string;
    };

    const products: Product[] = [
        { id: 22, names: ["Beetroot", "चुकंदर"], price: "60/kg", image: "/beetroot.jpeg", category: "Vegetables" },
        { id: 44, names: ["Bitter Gourd", "करेला"], price: "80/kg", image: "/bitter_gourd.jpg", category: "Vegetables" },
        { id: 32, names: ["Bottle Gourd", "लौकी"], price: "20/kg", image: "/bottle_gourd.jpg", category: "Vegetables" },
        { id: 20, names: ["Broccoli", "ब्रोकली"], price: "400/kg", image: "/broccoli.jpg", category: "Vegetables" },
        { id: 19, names: ["Brinjal", "बैंगन"], price: "60/kg", image: "/brinjal1.jpeg", category: "Vegetables" },
        { id: 13, names: ["Cabbage", "पत्ता गोभी"], price: "60/kg", image: "/cabbage.jpeg", category: "Vegetables" },
        { id: 18, names: ["Carrot", "गाजर"], price: "60/kg", image: "/carrot.jpeg", category: "Vegetables" },
        { id: 14, names: ["Cauliflower", "फूलगोभी"], price: "160/kg", image: "/cauliflower.jpeg", category: "Vegetables" },
        { id: 30, names: ["Chenopodium", "बथुआ"], price: "160/kg", image: "/chenopodium.jpg", category: "Vegetables" },
        { id: 11, names: ["Chili", "मिर्च"], price: "80/kg", image: "/chili.jpeg", category: "Vegetables" },
        { id: 35, names: ["Chili Moti", "मोटी मिर्च"], price: "80/kg", image: "/chili_moti.jpg", category: "Vegetables" },
        { id: 33, names: ["Cluster Beans Variety", "ग्वार फली (प्रकार)"], price: "100/kg", image: "/cluster_beans_variety.jpg", category: "Vegetables" },
        { id: 34, names: ["Cluster Beans Desi", "ग्वार फली (देशी)"], price: "80/kg", image: "/cluster_beans_desi.jpg", category: "Vegetables" },
        { id: 29, names: ["Colocasia", "अरबी"], price: "60/kg", image: "/colocasia.jpeg", category: "Vegetables" },
        { id: 24, names: ["Coriander Leaves", "धनिया"], price: "160/kg", image: "/coriander.jpeg", category: "Vegetables" },
        { id: 8, names: ["Capsicum", "शिमला मिर्च"], price: "120/kg", image: "/capsicum.jpeg", category: "Vegetables" },
        { id: 17, names: ["Cucumber", "खीरा"], price: "40/kg", image: "/cucumber.jpg", category: "Vegetables" },
        { id: 40, names: ["Drumstick", "सहजन"], price: "280/kg", image: "/drumstick.jpg", category: "Vegetables" },
        { id: 39, names: ["Methi (Fenugreek)", "मेथी"], price: "200/kg", image: "/methi.jpg", category: "Vegetables" },
        { id: 7, names: ["Ginger", "अदरक"], price: "200/kg", image: "/ginger.jpeg", category: "Vegetables" },
        { id: 27, names: ["Green Beans", "हरी फली"], price: "160/kg", image: "/green_beans.jpg", category: "Vegetables" },
        { id: 37, names: ["Green Bean", "हरी सेम"], price: "160/kg", image: "/green_bean.jpg", category: "Vegetables" },
        { id: 9, names: ["Garlic", "लहसुन"], price: "300/kg", image: "/garlic.jpeg", category: "Vegetables" },
        { id: 21, names: ["Jackfruit", "कटहल"], price: "40/kg", image: "/jackfruit.jpeg", category: "Vegetables" },
        { id: 41, names: ["Lotus Stem", "कमल ककड़ी"], price: "200/kg", image: "/lotus_stem.jpg", category: "Vegetables" },
        { id: 38, names: ["Lemon", "नींबू"], price: "160/kg", image: "/lemon.jpeg", category: "Vegetables" },
        { id: 23, names: ["Mint Leaves", "पुदीना"], price: "120/kg", image: "/mint_leaves.jpg", category: "Vegetables" },
        { id: 6, names: ["Onion", "प्याज"], price: "50/kg", image: "/onion.jpeg", category: "Vegetables" },
        { id: 16, names: ["Lady Finger", "भिंडी"], price: "40/kg", image: "/ladyfinger.jpeg", category: "Vegetables" },
        { id: 31, names: ["Pointed Gourd", "परवल"], price: "120/kg", image: "/pointed_gourd.jpeg", category: "Vegetables" },
        { id: 1, names: ["Potato", "आलू"], price: "35/kg", image: "/potatoes.jpeg", category: "Vegetables" },
        { id: 2, names: ["Potato Chipsona", "आलू चिप्सोना"], price: "40/kg", image: "/potatoes.jpeg", category: "Vegetables" },
        { id: 5, names: ["Potato Haldhwani", "आलू हल्द्वानी"], price: "60/kg", image: "/potatoes.jpeg", category: "Vegetables" },
        { id: 3, names: ["Potato Nath", "आलू नथ"], price: "40/kg", image: "/potatoes.jpeg", category: "Vegetables" },
        { id: 4, names: ["Potato Sugar Free", "आलू शुगर फ्री"], price: "70/kg", image: "/potatoes.jpeg", category: "Vegetables" },
        { id: 15, names: ["Pumpkin", "कद्दू"], price: "30/kg", image: "/pumpkin.jpeg", category: "Vegetables" },
        { id: 26, names: ["Radish", "मूली"], price: "80/kg", image: "/radish.jpeg", category: "Vegetables" },
        { id: 36, names: ["Ridge Gourd", "तोरी"], price: "30/kg", image: "/ridge_gourd.jpeg", category: "Vegetables" },
        { id: 25, names: ["Spinach", "पालक"], price: "60/kg", image: "/spinach.jpeg", category: "Vegetables" },
        { id: 43, names: ["Teasle Gourd", "कंटोला"], price: "80/kg", image: "/teasle_gourd.jpg", category: "Vegetables" },
        { id: 10, names: ["Tomato", "टमाटर"], price: "60/kg", image: "/tomato.jpg", category: "Vegetables" },
        { id: 28, names: ["Ivygourd", "कुंदरू"], price: "60/kg", image: "/ivygourd.jpeg", category: "Vegetables" },
        { id: 42, names: ["Pea", "मटर"], price: "240/kg", image: "/pea.jpeg", category: "Vegetables" },
        { id: 12, names: ["Pepper", "काली मिर्च"], price: "400/kg", image: "/pepper.jpg", category: "Vegetables" }
    ];




    const handleAddToCart = (product: Product) => {
        dispatch(add(product))
        console.log(product)
    };

    return (
        products.map((item) => (
            <div key={item.id} className='flex flex-wrap space-y-2 rounded-3xl overflow-hidden my-6 lg:my-8 mx-4 lg:mx-8 border'>
                <Image src={item.image} alt={item.names[0]} width={200} height={200} className="lg:h-52 h-36 center" />
                <div className='flex flex-wrap w-full items-center justify-between px-3'>
                    <h2 className='w-full'>{item.names[0]}</h2>
                    <h2>( {item.names[1]} )</h2>
                </div>
                <div className='flex w-full pl-3 justify-between items-center'>
                    <p className='flex items-center'><IndianRupee size={16} />{item.price}</p>
                    <button
                        className='bg-green-500 rounded-tl-3xl px-6 lg:px-8 justify-between py-2 flex'
                        onClick={() => handleAddToCart(item)}
                    >
                        <ShoppingCart />
                    </button>
                </div>

            </div >
        ))
    )
}