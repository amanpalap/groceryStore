'use client'
import { CarouselPlugin } from '@/components/carousal'
import ProductCard from '@/components/ProductCard'

export default function page() {
    return (
        <div className='flex flex-wrap'>
            <div className='flex items-center justify-center w-full' >
                <CarouselPlugin />
            </div>
            <div className='w-full grid lg:grid-cols-5 grid-cols-2'>
                <ProductCard />
            </div>
        </div>
    )
}

