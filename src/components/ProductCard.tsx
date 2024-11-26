import { add } from '@/lib/store/features/cart/cartSlice';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { IndianRupee, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast'
import { isAuthenticated } from '@/helpers/isUserLoggedIn';
import { useSession } from 'next-auth/react';

interface Product {
    id: number;
    names: [string, string];
    price: string;
    image: string;
    category: string;
    amount: number
}

export default function ProductCard() {

    const { data: session } = useSession()
    const { toast } = useToast()
    const dispatch = useAppDispatch()

    const products: Product[] = [
        { id: 22, names: ["Beetroot", "चुकंदर"], price: "60", image: "/beetroot.jpeg", category: "Vegetables", amount: 0 },
        { id: 44, names: ["Bitter Gourd", "करेला"], price: "80", image: "/bittergourd.jpeg", category: "Vegetables", amount: 0 },
        { id: 32, names: ["Bottle Gourd", "लौकी"], price: "20", image: "/bottlegourd.jpeg", category: "Vegetables", amount: 0 },
        { id: 20, names: ["Broccoli", "ब्रोकली"], price: "400", image: "/broccoli.jpeg", category: "Vegetables", amount: 0 },
        { id: 19, names: ["Brinjal", "बैंगन"], price: "60", image: "/brinjal1.jpeg", category: "Vegetables", amount: 0 },
        { id: 13, names: ["Cabbage", "पत्ता गोभी"], price: "60", image: "/cabbage.jpeg", category: "Vegetables", amount: 0 },
        { id: 18, names: ["Carrot", "गाजर"], price: "60", image: "/carrot.jpeg", category: "Vegetables", amount: 0 },
        { id: 14, names: ["Cauliflower", "फूलगोभी"], price: "160", image: "/cauliflower.jpeg", category: "Vegetables", amount: 0 },
        { id: 30, names: ["Chenopodium", "बथुआ"], price: "160", image: "/chenopodium.jpg", category: "Vegetables", amount: 0 },
        { id: 11, names: ["Chili", "मिर्च"], price: "80", image: "/chili.jpeg", category: "Vegetables", amount: 0 },
        { id: 50, names: ["Chili Moti", "मोटी मिर्च"], price: "80", image: "/chili_moti1.jpeg", category: "Vegetables", amount: 0 },
        { id: 35, names: ["Chili Moti", "मोटी मिर्च"], price: "80", image: "/chili_moti.jpeg", category: "Vegetables", amount: 0 },
        { id: 33, names: ["Cluster Beans Variety", "ग्वार फली (प्रकार)"], price: "100", image: "/cluster_beans_variety.jpeg", category: "Vegetables", amount: 0 },
        { id: 34, names: ["Cluster Beans Desi", "ग्वार फली (देशी)"], price: "80", image: "/cluster_beans_desi.jpeg", category: "Vegetables", amount: 0 },
        { id: 29, names: ["Colocasia", "अरबी"], price: "60", image: "/colocasia.jpeg", category: "Vegetables", amount: 0 },
        { id: 24, names: ["Coriander Leaves", "धनिया"], price: "160", image: "/coriander.jpeg", category: "Vegetables", amount: 0 },
        { id: 8, names: ["Capsicum", "शिमला मिर्च"], price: "120", image: "/capsicum.jpeg", category: "Vegetables", amount: 0 },
        { id: 17, names: ["Cucumber", "खीरा"], price: "40", image: "/cucumber.jpeg", category: "Vegetables", amount: 0 },
        { id: 40, names: ["Drumstick", "सहजन"], price: "280", image: "/drumstick.jpeg", category: "Vegetables", amount: 0 },
        { id: 39, names: ["Methi (Fenugreek)", "मेथी"], price: "200", image: "/methi.jpg", category: "Vegetables", amount: 0 },
        { id: 7, names: ["Ginger", "अदरक"], price: "200", image: "/ginger.jpeg", category: "Vegetables", amount: 0 },
        { id: 27, names: ["Green Beans", "हरी फली"], price: "160", image: "/green_beans.jpeg", category: "Vegetables", amount: 0 },
        { id: 37, names: ["Green Bean", "हरी सेम"], price: "160", image: "/green_bean.jpeg", category: "Vegetables", amount: 0 },
        { id: 9, names: ["Garlic", "लहसुन"], price: "300", image: "/garlic.jpeg", category: "Vegetables", amount: 0 },
        { id: 21, names: ["Jackfruit", "कटहल"], price: "40", image: "/jackfruit.jpeg", category: "Vegetables", amount: 0 },
        { id: 41, names: ["Lotus Stem", "कमल ककड़ी"], price: "200", image: "/lotus_stem.jpeg", category: "Vegetables", amount: 0 },
        { id: 38, names: ["Lemon", "नींबू"], price: "160", image: "/lemon.jpeg", category: "Vegetables", amount: 0 },
        { id: 23, names: ["Mint Leaves", "पुदीना"], price: "120", image: "/mint_leaves.jpeg", category: "Vegetables", amount: 0 },
        { id: 6, names: ["Onion", "प्याज"], price: "50", image: "/onion.jpeg", category: "Vegetables", amount: 0 },
        { id: 16, names: ["Lady Finger", "भिंडी"], price: "40", image: "/ladyfinger.jpeg", category: "Vegetables", amount: 0 },
        { id: 31, names: ["Pointed Gourd", "परवल"], price: "120", image: "/pointed_gourd.jpeg", category: "Vegetables", amount: 0 },
        { id: 1, names: ["Potato", "आलू"], price: "35", image: "/potatoes.jpeg", category: "Vegetables", amount: 0 },
        { id: 2, names: ["Potato Chipsona", "आलू चिप्सोना"], price: "40", image: "/potatoe_chipsona.jpeg", category: "Vegetables", amount: 0 },
        { id: 5, names: ["Potato Haldhwani", "आलू हल्द्वानी"], price: "60", image: "/potato_haldhwani.jpeg", category: "Vegetables", amount: 0 },
        { id: 3, names: ["Potato Nath", "आलू नथ"], price: "40", image: "/potatoe_nath.jpeg", category: "Vegetables", amount: 0 },
        { id: 4, names: ["Potato Sugar Free", "आलू शुगर फ्री"], price: "70", image: "/potato_sugar_free.jpeg", category: "Vegetables", amount: 0 },
        { id: 15, names: ["Pumpkin", "कद्दू"], price: "30", image: "/pumpkin.jpeg", category: "Vegetables", amount: 0 },
        { id: 26, names: ["Radish", "मूली"], price: "80", image: "/radish.jpeg", category: "Vegetables", amount: 0 },
        { id: 36, names: ["Ridge Gourd", "तोरी"], price: "30", image: "/ridge_gourd.jpeg", category: "Vegetables", amount: 0 },
        { id: 25, names: ["Spinach", "पालक"], price: "60", image: "/spinach.jpeg", category: "Vegetables", amount: 0 },
        { id: 43, names: ["Teasle Gourd", "ककोरा"], price: "80", image: "/teasle_gourd.jpeg", category: "Vegetables", amount: 0 },
        { id: 10, names: ["Tomato", "टमाटर"], price: "60", image: "/tomato.jpg", category: "Vegetables", amount: 0 },
        { id: 28, names: ["Ivygourd", "कुंदरू"], price: "60", image: "/ivygourd.jpeg", category: "Vegetables", amount: 0 },
        { id: 42, names: ["Pea", "मटर"], price: "240", image: "/pea.jpeg", category: "Vegetables", amount: 0 },
        { id: 12, names: ["Pepper", "काली मिर्च"], price: "400", image: "/pepper.jpeg", category: "Vegetables", amount: 0 }
    ];

    const handleAddToCart = (product: Product) => {
        dispatch(add(product))
        if (session) {
            toast({
                title: `${product.names[0]}`,
                description: " Successfully added to cart",
                variant: 'default'
            })
        } else {
            toast({
                title: "Sign-Up to access cart",
                description: "Please Login",
                variant: 'destructive'
            })
        }
        console.log(product)
    };

    return (
        products.map((item) => (
            <div key={item.id} className='flex flex-wrap space-y-2 rounded-3xl overflow-hidden my-6 lg:my-8 mx-4 lg:mx-8 border'>
                <Image src={item.image} alt={item.names[0]} width={200} height={200} className="lg:h-44 stretch h-44 w-full" />
                <div className='flex flex-wrap w-full items-center justify-between px-3'>
                    <h2 className='w-full'>{item.names[0]}</h2>
                    <h2>( {item.names[1]} )</h2>
                </div>
                <div className='flex w-full pl-3 justify-between items-center'>
                    <p className='flex items-center'><IndianRupee size={16} />{item.price}/kg</p>
                    <button
                        className='bg-green-500 active:scale-50 transition transform duration-300 rounded-tl-3xl px-6 lg:px-8 justify-between py-2 flex'
                        onClick={() => handleAddToCart(item)}
                    >
                        <ShoppingCart />
                    </button>
                </div>
            </div >
        ))
    )
}