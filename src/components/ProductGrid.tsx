import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define the Product type
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

// Mock data for products (replace this with actual data fetching logic)
const products: Product[] = [
    {
        id: 1,
        name: "Wheelchair",
        description: "Comfortable and durable wheelchair for everyday use.",
        price: 299.99,
        imageUrl: "/images/wheelchair.jpg",
    },
    {
        id: 2,
        name: "Walker",
        description: "Adjustable walker with easy-fold mechanism for portability.",
        price: 89.99,
        imageUrl: "/images/walker.jpg",
    },
    {
        id: 3,
        name: "Hospital Bed",
        description: "Electric hospital bed with adjustable height and positions.",
        price: 999.99,
        imageUrl: "/images/hospital-bed.jpg",
    },
    {
        id: 4,
        name: "Oxygen Concentrator",
        description: "Portable oxygen concentrator for respiratory support.",
        price: 699.99,
        imageUrl: "/images/oxygen-concentrator.jpg",
    },
    {
        id: 5,
        name: "Mobility Scooter",
        description: "Electric mobility scooter for enhanced independence.",
        price: 1299.99,
        imageUrl: "/images/mobility-scooter.jpg",
    },
    {
        id: 6,
        name: "Shower Chair",
        description: "Adjustable shower chair for safe bathing.",
        price: 79.99,
        imageUrl: "/images/shower-chair.jpg",
    },
    {
        id: 7,
        name: "Crutches",
        description: "Lightweight aluminum crutches for temporary mobility support.",
        price: 39.99,
        imageUrl: "/images/crutches.jpg",
    },
    {
        id: 8,
        name: "CPAP Machine",
        description: "Continuous Positive Airway Pressure machine for sleep apnea.",
        price: 799.99,
        imageUrl: "/images/cpap-machine.jpg",
    },
    {
        id: 9,
        name: "Lift Chair",
        description: "Power lift recliner chair for comfort and assistance.",
        price: 599.99,
        imageUrl: "/images/lift-chair.jpg",
    },
];

const ProductGrid: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                    Our Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1">
                            <div className="relative h-64">
                                <Image
                                    src={`https://placehold.co/600x400?text=${encodeURIComponent(product.name)}`}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                                    <Button>Add to Cart</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="icon"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
