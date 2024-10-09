"use client"
import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Newsletter from '@/components/Newsletter'
import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'
import { useParams, useRouter } from 'next/navigation'
import AddToCartButton from '@/components/AddToCart'

type Product = {
    id: number;
    title: string;
    description: string;
    tags: string;
    price: number;
};

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productId = params['product-id']
                const response = await fetch(`http://127.0.0.1:5001/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            }
        };

        fetchProduct();
    }, [params])

    if (!product) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Oops!</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for couldn't be found.</p>
                    <Button onClick={() => router.push('/products')}>
                        Back to Products
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/products')}
                            className="mb-6"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Products
                        </Button>
                        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
                            <div className="space-y-4">
                                <img
                                    src={`https://placehold.co/600x400?text=${encodeURIComponent(product.title)}`}
                                    alt={product.title}
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>
                            <div className="space-y-6">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    {product.title}
                                </h1>
                                <p className="text-xl text-gray-700">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-primary">
                                        ${product.price}
                                    </span>
                                    {/* <AddToCartButton product={product} /> */}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Tags</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.split(',').map((tag, index) => (
                                            <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                            Why Choose Our {product.title}?
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Superior Quality</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    Our {product.title} is made with the finest materials and undergoes rigorous quality checks.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Competitive Pricing</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    We offer the best value for your money without compromising on quality.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Warranty & Support</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    Our {product.title} comes with a warranty and dedicated customer support.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Faqs />
                <Newsletter />
            </main>
            <Footer />
        </div>
    )
}