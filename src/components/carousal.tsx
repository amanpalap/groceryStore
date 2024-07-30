import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import a from '../../public/1.jpeg'
import b from '../../public/2.jpeg'
import c from '../../public/3.jpeg'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function CarouselPlugin() {

    const data = [
        {
            id: 1,
            img: a
        },
        {
            id: 2,
            img: b
        },
        {
            id: 3,
            img: c
        },

    ]
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
        >
            <CarouselContent className="w-full border-2">
                {data.map((data) => (
                    <CarouselItem className="w-full h-80" key={data.id}>
                        <Image src={data.img} alt={"image"} className="w-full self-stretch center"></Image>
                    </CarouselItem>

                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
