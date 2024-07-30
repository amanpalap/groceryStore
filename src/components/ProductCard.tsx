import React from 'react'

export default function ProductCard() {

    const products = [
        { names: ["Carrot", "गाजर"], price: "40/kg", image: "carrot.jpg", category: "Vegetables" },
        { names: ["Radish", "मूली"], price: "25/kg", image: "radish.jpg", category: "Vegetables" },
        { names: ["Brinjal", "बैंगन"], price: "45/kg", image: "brinjal.jpg", category: "Vegetables" },
        { names: ["Onion", "प्याज"], price: "35/kg", image: "onion.jpg", category: "Vegetables" },
        { names: ["Garlic", "लहसुन"], price: "60/kg", image: "garlic.jpg", category: "Vegetables" },
        { names: ["Potato", "आलू"], price: "30/kg", image: "potato.jpg", category: "Vegetables" },
        { names: ["Tomato", "टमाटर"], price: "50/kg", image: "tomato.jpg", category: "Vegetables" },
        { names: ["Spinach", "पालक"], price: "20/kg", image: "spinach.jpg", category: "Vegetables" },
        { names: ["Cauliflower", "फूलगोभी"], price: "55/kg", image: "cauliflower.jpg", category: "Vegetables" },
        { names: ["Cucumber", "खीरा"], price: "30/kg", image: "cucumber.jpg", category: "Vegetables" },
        { names: ["Green Beans", "हरी फली"], price: "60/kg", image: "green_beans.jpg", category: "Vegetables" },
        { names: ["Pumpkin", "कद्दू"], price: "40/kg", image: "pumpkin.jpg", category: "Vegetables" },
        { names: ["Capsicum", "शिमला मिर्च"], price: "50/kg", image: "capsicum.jpg", category: "Vegetables" },
        { names: ["Beetroot", "चुकंदर"], price: "35/kg", image: "beetroot.jpg", category: "Vegetables" },
        { names: ["Methi (Fenugreek)", "मेथी"], price: "40/kg", image: "methi.jpg", category: "Vegetables" },
        { names: ["Ginger", "अदरक"], price: "80/kg", image: "ginger.jpg", category: "Vegetables" },
        { names: ["Okra (Lady Finger)", "भिंडी"], price: "60/kg", image: "okra.jpg", category: "Vegetables" },
        { names: ["Bottle Gourd", "lauki", "लौकी"], price: "35/kg", image: "bottle_gourd.jpg", category: "Vegetables" },
        { names: ["Cabbage", "पत्ता गोभी"], price: "30/kg", image: "cabbage.jpg", category: "Vegetables" },
        { names: ["Sweet Potato", "शकरकंद"], price: "40/kg", image: "sweet_potato.jpg", category: "Vegetables" },
        { names: ["French Beans", "फ्रेंच बीन्स"], price: "70/kg", image: "french_beans.jpg", category: "Vegetables" },
        { names: ["Karela (Bitter Gourd)", "करेला"], price: "55/kg", image: "karela.jpg", category: "Vegetables" },
        { names: ["Tori (Ridge Gourd)", "तोरी"], price: "45/kg", image: "ridge_gourd.jpg", category: "Vegetables" },
        { names: ["Green Peas", "हरी मटर"], price: "80/kg", image: "green_peas.jpg", category: "Vegetables" },
        { names: ["Chili", "मिर्च"], price: "70/kg", image: "chili.jpg", category: "Vegetables" },
        { names: ["Arbi (Taro Root)", "अरबी"], price: "50/kg", image: "taro_root.jpg", category: "Vegetables" },
        { names: ["Celery", "सेलेरी"], price: "90/kg", image: "celery.jpg", category: "Vegetables" },
        { names: ["Green Chili", "हरी मिर्च"], price: "60/kg", image: "green_chili.jpg", category: "Vegetables" },
        { names: ["Radish Leaves", "मूली के पत्ते"], price: "30/kg", image: "radish_leaves.jpg", category: "Vegetables" },
        { names: ["Turnip", "शलगम"], price: "40/kg", image: "turnip.jpg", category: "Vegetables" },
        { names: ["Coriander Leaves", "धनिया"], price: "50/kg", image: "coriander_leaves.jpg", category: "Vegetables" },
        { names: ["Mint Leaves", "पुदीना"], price: "60/kg", image: "mint_leaves.jpg", category: "Vegetables" },
        { names: ["Leek", "लीक"], price: "90/kg", image: "leek.jpg", category: "Vegetables" },
        { names: ["Asparagus", "अस्पैरेगस"], price: "120/kg", image: "asparagus.jpg", category: "Vegetables" },
        { names: ["Napa Cabbage", "नापा गोभी"], price: "40/kg", image: "napa_cabbage.jpg", category: "Vegetables" },
        { names: ["Shallots", "छोटे प्याज"], price: "70/kg", image: "shallots.jpg", category: "Vegetables" },
        { names: ["Curry Leaves", "करी पत्ते"], price: "80/kg", image: "curry_leaves.jpg", category: "Vegetables" },
        { names: ["Dill Leaves", "सौंपा"], price: "50/kg", image: "dill_leaves.jpg", category: "Vegetables" },
        { names: ["Chayote", "चायोट"], price: "90/kg", image: "chayote.jpg", category: "Vegetables" },
        { names: ["Gourd", "घिया"], price: "45/kg", image: "gourd.jpg", category: "Vegetables" },
        { names: ["Fennel", "सौंफ"], price: "60/kg", image: "fennel.jpg", category: "Vegetables" },
        { names: ["Kohlrabi", "कोलरबी"], price: "50/kg", image: "kohlrabi.jpg", category: "Vegetables" },
        { names: ["Tamarind Leaves", "इमली के पत्ते"], price: "40/kg", image: "tamarind_leaves.jpg", category: "Vegetables" },
        { names: ["Chickpea Leaves", "चने के पत्ते"], price: "60/kg", image: "chickpea_leaves.jpg", category: "Vegetables" },
        { names: ["Yam", "सुरन"], price: "70/kg", image: "yam.jpg", category: "Vegetables" },
        { names: ["Bitter Gourd Leaves", "करेला के पत्ते"], price: "55/kg", image: "bitter_gourd_leaves.jpg", category: "Vegetables" },
        { names: ["Kachri", "कचरी"], price: "50/kg", image: "kachri.jpg", category: "Vegetables" },
        { names: ["Cucumber Leaves", "खीरे के पत्ते"], price: "30/kg", image: "cucumber_leaves.jpg", category: "Vegetables" },
        { names: ["Lotus Stem", "कमल ककड़ी"], price: "80/kg", image: "lotus_stem.jpg", category: "Vegetables" },
        { names: ["Jute Leaves", "पौष्टिक पत्ते"], price: "60/kg", image: "jute_leaves.jpg", category: "Vegetables" },
        { names: ["Moringa Leaves", "सहजन के पत्ते"], price: "70/kg", image: "moringa_leaves.jpg", category: "Vegetables" }
    ];

    return (
        products.map((items, index) => (
            <div>
                <h2>{items.names[0]}</h2>
                <p>Price: {items.price}</p>
                <img src={items.image} alt={items.names[0]} />
            </div>
        ))
    )
}

