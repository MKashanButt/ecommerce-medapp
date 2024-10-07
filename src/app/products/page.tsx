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

// Define the Product type
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
};

const initialProducts: Product[] = [
    {
        id: 1,
        name: "Wheelchair",
        description: "Comfortable and durable wheelchair for everyday use.",
        price: 299.99,
        imageUrl: "/images/wheelchair.jpg",
        category: "Mobility",
    },
    {
        id: 2,
        name: "Walker",
        description: "Adjustable walker with easy-fold mechanism for portability.",
        price: 89.99,
        imageUrl: "/images/walker.jpg",
        category: "Mobility",
    },
    {
        id: 3,
        name: "Hospital Bed",
        description: "Electric hospital bed with adjustable height and positions.",
        price: 999.99,
        imageUrl: "/images/hospital-bed.jpg",
        category: "Bedroom",
    },
    {
        id: 4,
        name: "Oxygen Concentrator",
        description: "Portable oxygen concentrator for respiratory support.",
        price: 699.99,
        imageUrl: "/images/oxygen-concentrator.jpg",
        category: "Respiratory",
    },
    {
        id: 5,
        name: "Shower Chair",
        description: "Sturdy shower chair with non-slip feet for bathroom safety.",
        price: 59.99,
        imageUrl: "/images/shower-chair.jpg",
        category: "Bathroom",
    },
    {
        id: 6,
        name: "Crutches",
        description: "Adjustable aluminum crutches for temporary mobility assistance.",
        price: 39.99,
        imageUrl: "/images/crutches.jpg",
        category: "Mobility",
    },
    {
        id: 7,
        name: "Blood Pressure Monitor",
        description: "Digital blood pressure monitor for home use.",
        price: 49.99,
        imageUrl: "/images/bp-monitor.jpg",
        category: "Health Monitoring",
    },
];

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('')
    const [products] = useState<Product[]>(initialProducts)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
    const [categories, setCategories] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(6)
    const searchParams = useSearchParams()
    const router = useRouter()
    const search = searchParams.get('search')

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(products.map(product => product.category)))
        setCategories(uniqueCategories)

        if (search) {
            setSearchQuery(search)
        }
    }, [products, search])

    useEffect(() => {
        filterProducts()
    }, [searchQuery, selectedCategories, products])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const filterProducts = () => {
        let filtered = products

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => selectedCategories.includes(product.category))
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
                                    {categories.map(category => (
                                        <div key={category} className="flex items-center">
                                            <Checkbox
                                                id={category}
                                                checked={selectedCategories.includes(category)}
                                                onCheckedChange={() => handleCategoryChange(category)}
                                            />
                                            <label htmlFor={category} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {category}
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
                                            <img src={`https://placehold.co/600x400?text=${encodeURIComponent(product.name)}`} alt={product.name} className="w-full h-48 object-cover" />
                                            <Link href={`/products/${product.id}`}>
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
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
