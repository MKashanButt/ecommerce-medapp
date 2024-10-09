import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
};

export default function ProductSlider() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<number | undefined>();

    const getVisibleSlides = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 1; // Mobile
            if (window.innerWidth < 1024) return 2; // Tablet
            return 4; // Desktop
        }
        return 4; // Default to desktop view
    };

    const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5001/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Autoplay Logic
    useEffect(() => {
        autoplayRef.current = window.setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(autoplayRef.current);
    }, [currentSlide, visibleSlides]);

    useEffect(() => {
        const handleResize = () => {
            setVisibleSlides(getVisibleSlides());
            setCurrentSlide(0); // Reset to first slide on resize
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % (products.length - visibleSlides + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + (products.length - visibleSlides + 1)) % (products.length - visibleSlides + 1));
    };

    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = 100 / visibleSlides;
            sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        }
    }, [currentSlide, visibleSlides]);

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 sm:mb-0">Products</h2>
                    <div className="flex space-x-2">
                        <Button onClick={prevSlide} variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous</span>
                        </Button>
                        <Button onClick={nextSlide} variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next</span>
                        </Button>
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <div
                        ref={sliderRef}
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ width: `${(100 * products.length) / visibleSlides}%` }}
                    >
                        {products.map((product) => (
                            <div key={product.id} className={`w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2`}>
                                <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-4">
                                    <div className="relative w-full h-48 mb-4">
                                        <img
                                            src={`https://placehold.co/500x200?text=${encodeURIComponent(product.title)}`}
                                            alt={product.title}
                                            className="rounded-xl object-cover sm:w-[4em] md:w-full lg:w-full h-full"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-center">{product.title}</h3>
                                    <p className="mt-2 text-sm text-gray-700 text-center">{product.description}</p>
                                    <Link href={`/products/${product.id}`}>
                                        <Button className="mt-4 w-full" variant="outline">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
