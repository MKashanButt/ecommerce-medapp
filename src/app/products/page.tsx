"use client"
import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Header from '@/components/Header'
import Newsletter from '@/components/Newsletter'
import Faqs from '@/components/Faqs'
import { useSearchParams, useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCart'

// Define the Product type based on the schema
type Product = {
    id: number;
    title: string;
    description: string;
    tags: string;
    created_at: string;
    updated_at: string;
    price: string;
};

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(6)
    const searchParams = useSearchParams()
    const router = useRouter()
    const search = searchParams.get('search')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5001/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
                const uniqueTags = Array.from(new Set(data.flatMap((product: Product) => product.tags.split(',').map(tag => tag.trim()))))
                setTags(uniqueTags as string[])
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

        if (search) {
            setSearchQuery(search)
        }
    }, [search])

    useEffect(() => {
        filterProducts()
    }, [searchQuery, selectedTags, products])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }

    const handleTagChange = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    const filterProducts = () => {
        let filtered = products

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter(product =>
                selectedTags.some(tag => product.tags.toLowerCase().includes(tag.toLowerCase()))
            )
        }

        setFilteredProducts(filtered)
        setCurrentPage(1)
    }

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Our Products
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                                    Discover our range of high-quality durable medical equipment.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2" onSubmit={handleSearch}>
                                    <Input
                                        className="max-w-lg flex-1"
                                        placeholder="Search products..."
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button type="submit">
                                        <Search className="h-4 w-4" />
                                        <span className="sr-only">Search</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Filters */}
                            <div className="w-full md:w-1/4">
                                <h2 className="text-2xl font-bold mb-4">Filters</h2>
                                <div className="space-y-2">
                                    {tags.map(tag => (
                                        <div key={tag} className="flex items-center">
                                            <Checkbox
                                                id={tag}
                                                checked={selectedTags.includes(tag)}
                                                onCheckedChange={() => handleTagChange(tag)}
                                            />
                                            <label htmlFor={tag} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {tag.charAt(0).toUpperCase() + tag.substring(1)}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="w-full md:w-3/4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentProducts.map((product) => (
                                        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                            <img src={`https://placehold.co/600x400?text=${encodeURIComponent(product.title)}`} alt={product.title} className="w-full h-48 object-cover" />
                                            <Link href={`/products/${product.id}`}>
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                                                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xl font-bold text-primary">
                                                            {product.price !== undefined && product.price !== null
                                                                ? `$${product.price}`
                                                                : 'Price not available'}
                                                        </span>
                                                        <AddToCartButton product={product} />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                <div className="mt-8 flex justify-end">
                                    {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                                        <Button
                                            key={i}
                                            onClick={() => paginate(i + 1)}
                                            className={`mx-1 ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                            Why Choose Our Products?
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
                                    Our products are made with the finest materials and undergo rigorous quality checks.
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
                                    All our products come with a warranty and dedicated customer support.
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