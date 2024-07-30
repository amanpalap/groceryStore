'use client'
import { CarouselPlugin } from '@/components/carousal'
import ProductCard from '@/components/ProductCard'

export default function page() {
    return (
        <div>
            <div className='flex items-center justify-center w-full'>
                <CarouselPlugin />
            </div>
            <div>
                <ProductCard />
            </div>
        </div>
    )
}

