import React from 'react';

const AboutUs: React.FC = () => {
    return (

        <div className="mx-auto px-4 text-white p-4 w-full">
            <h2 className="text-3xl font-bold text-center mb-6 w-full">
                About Us
            </h2>
            <div className="grid grid-cols-1 lg:px-48 gap-12 w-full">
                {/* About Us Content */}
                <div className='w-full'>
                    <p className="text-lg mb-8">
                        Welcome to <span className="font-semibold text-red-300">Etawah Vegetable Shop</span>, your trusted source for fresh, hand-picked vegetables delivered right to your doorstep.
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">
                        Our Commitment to Quality
                    </h3>
                    <p className="mb-6 px-8">
                        We partner with local farmers and trusted suppliers to ensure that only the best and freshest vegetables make it to your kitchen. Every vegetable is carefully selected, packed, and delivered with the highest standards of hygiene and safety. We take pride in supporting sustainable farming practices, helping you eat healthy while also caring for the environment.
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">
                        Why Choose Us?
                    </h3>
                    <ul className="list-disc list-inside mb-6 px-8">
                        <li><strong>Freshness Guaranteed:</strong> We deliver vegetables that are fresh, crisp, and full of flavor.</li>
                        <li><strong>Convenient Ordering:</strong> With our easy-to-use website, you can order your favorite vegetables from the comfort of your home.</li>
                        <li><strong>Timely Delivery:</strong> We ensure that your order reaches you on time, every time.</li>
                        <li><strong>Competitive Pricing:</strong> Enjoy premium quality vegetables at prices that won’t break the bank.</li>
                        <li><strong>Customer Satisfaction:</strong> Your satisfaction is our top priority. We are here to serve you with dedication and a smile.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mb-4">
                        Join Our Community
                    </h3>
                    <p className="mb-6 px-8">
                        When you choose <span className="font-semibold">[Your Store Name]</span>, you're not just buying vegetables – you're joining a community that values health, quality, and convenience. We’re more than just a store; we’re your partner in leading a healthier lifestyle. Let us be a part of your journey to better eating, one fresh vegetable at a time.
                    </p>

                    <p className="font-semibold text-center mb-8">
                        Thank you for choosing <span className="font-semibold text-red-300">Etawah Vegetable Shop</span>. We look forward to serving you!
                    </p>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4 w-full text-center">
                            Terms and Conditions
                        </h3>
                        <p className="mb-6">
                            By using our website and services, you agree to the following terms and conditions:
                        </p>
                        <ul className="list-disc list-inside mb-6 px-8">
                            <li>All orders are subject to availability. We reserve the right to limit the quantity of any items we supply.</li>
                            <li>Prices for our products are subject to change without notice.</li>
                            <li>We are not responsible for any delays in delivery caused by events outside our control.</li>
                            <li>Customers are responsible for providing accurate delivery information at the time of placing an order.</li>
                            <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
                        </ul>
                    </div>
                </div>



            </div>
        </div>

    );
};

export default AboutUs;
