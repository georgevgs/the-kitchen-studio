import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ImageMetadata } from 'astro'

interface ImageType {
    src: ImageMetadata
    alt: string
}

interface CarouselProps {
    images: ImageType[]
    widthType: 'normal' | 'full-width' | 'default'
}

const getHeightClass = (type: CarouselProps['widthType']): string => {
    if (type === 'normal') {
        return 'h-[calc(100vh-64px)] md:h-[38rem]'
    }

    if (type === 'full-width') {
        return 'h-[32rem] md:h-[38rem]'
    }

    return 'h-96'
}

const getContainerClass = (type: CarouselProps['widthType']): string => {
    if (type === 'normal') {
        return 'max-w-[1280px] w-full'
    }

    return 'w-full'
}

const ImageLightbox = ({
    image,
    isOpen,
    onClose
}: {
    image: ImageType | null
    isOpen: boolean
    onClose: () => void
}) => {
    if (!image) {
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 text-white"
                    onClick={onClose}
                >
                    <X className="h-6 w-6" />
                </Button>
                <img
                    src={image.src.src}
                    alt={image.alt}
                    className="w-full h-auto"
                />
            </DialogContent>
        </Dialog>
    )
}

const CarouselComponent = ({ images, widthType }: CarouselProps) => {
    const [lightboxOpen, setLightboxOpen] = React.useState(false)
    const [lightboxImage, setLightboxImage] = React.useState<ImageType | null>(null)

    const plugin = React.useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            stopOnFocusIn: true
        })
    )

    const heightClass = getHeightClass(widthType)
    const containerClass = getContainerClass(widthType)

    const handleImageClick = (image: ImageType) => {
        setLightboxImage(image)
        setLightboxOpen(true)
        plugin.current.stop()
    }

    const handleLightboxClose = () => {
        setLightboxOpen(false)
        plugin.current.reset()
    }

    return (
        <section className={cn(containerClass, 'mx-auto')} id="carousel">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className={heightClass}>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="basis-full">
                            <Card className="border-0">
                                <CardContent className="p-0">
                                    <img
                                        src={image.src.src}
                                        alt={image.alt}
                                        className={cn(
                                            'h-full w-full object-cover cursor-pointer',
                                            heightClass
                                        )}
                                        loading={widthType === 'full-width' ? 'eager' : 'lazy'}
                                        onClick={() => handleImageClick(image)}
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>

            <ImageLightbox
                image={lightboxImage}
                isOpen={lightboxOpen}
                onClose={handleLightboxClose}
            />
        </section>
    )
}

export default CarouselComponent