"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductSlider from '@/components/ProductSlider'
import Popup from '@/components/Popup'
import Newsletter from '@/components/Newsletter'
import Faqs from '@/components/Faqs'
import Testimonials from '@/components/Testimonials'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

const allProducts: Product[] = [
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

export default function Home() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSubmit = (data: { firstName: string; lastName: string; phone: string; email?: string }) => {
    console.log('Form Data:', data);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
      />
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Quality Durable Medical Equipment
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                  Empowering your health with reliable and innovative medical solutions.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSearch} className="flex space-x-2">
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
        <ProductSlider products={allProducts} />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-primary">About Us</h2>
            <p className="text-lg mb-12 text-gray-600 max-w-2xl mx-auto">
              At DME Store, we are committed to providing top-quality durable medical equipment to enhance your well-being. Our mission is to empower individuals with the tools they need to lead healthier, more fulfilling lives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-2">
                <div className="flex justify-center items-center mb-4 bg-gray-100 rounded-full h-16 w-16 mx-auto">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Reliable Quality</h3>
                <p className="text-gray-600 mt-4">
                  Our equipment meets the highest standards for durability and reliability.
                </p>
              </div>
              <div className="p-8 bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-2">
                <div className="flex justify-center items-center mb-4 bg-gray-100 rounded-full h-16 w-16 mx-auto">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 10l-4-4v3H8v2h9v3l4-4zM5 12H3v7a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7H5v-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Customer Support</h3>
                <p className="text-gray-600 mt-4">
                  We offer 24/7 customer support to assist you with your needs.
                </p>
              </div>
              <div className="p-8 bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-2">
                <div className="flex justify-center items-center mb-4 bg-gray-100 rounded-full h-16 w-16 mx-auto">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 6h-3v5h-2V6h-6v5H7V6H4v14h3v-5h2v5h6v-5h2v5h3V6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Fast Delivery</h3>
                <p className="text-gray-600 mt-4">
                  Our delivery service ensures quick and secure shipping of your orders.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Why Choose Us?</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Quality Products</h3>
                <p className="mt-2 text-sm text-gray-700">
                  We offer only the highest quality durable medical equipment.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Expert Support</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Our team of experts is always ready to assist you.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect height="12" rx="2" width="14" x="2" y="6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Fast Shipping</h3>
                <p className="mt-2 text-sm text-gray-700">
                  We ensure quick and reliable delivery of your orders.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
        <Faqs />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
