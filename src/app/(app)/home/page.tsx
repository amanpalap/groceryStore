'use client'
import { CarouselPlugin } from '@/components/carousal'
import ProductCard from '@/components/ProductCard'

export default function page() {
    return (
        <div className='flex flex-wrap'>
            <div className='flex items-center justify-center w-full'>
                <CarouselPlugin />
            </div>
            <div className='w-full grid grid-cols-5'>
                <ProductCard />
            </div>
        </div>
    )
}

