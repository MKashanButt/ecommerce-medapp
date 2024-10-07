import React, { useState, useEffect } from "react";

const testimonialsData = [
    {
        text: "The equipment I received was top-notch, and the customer service was outstanding!",
        author: "Jane Doe",
    },
    {
        text: "Fast shipping and quality products. Highly recommend DME Store!",
        author: "John Smith",
    },
    {
        text: "Exceptional service and great selection of medical supplies!",
        author: "Emily Johnson",
    },
    {
        text: "I trust DME Store for all my medical needs. Highly satisfied!",
        author: "Michael Brown",
    },
];

export default function Testimonials() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Autoplay functionality
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonialsData.length / 2));
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonialsData.length / 2));
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonialsData.length / 2)) % Math.ceil(testimonialsData.length / 2));
    };

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center relative">
                <h2 className="text-4xl font-bold mb-6 text-primary">What Our Customers Say</h2>
                <p className="text-lg mb-12 text-gray-600 max-w-2xl mx-auto">
                    Hear from those who trust us for their medical equipment needs.
                </p>
                <div className="relative flex items-center justify-center">
                    <div
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary z-10"
                        onClick={handlePrev}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </div>
                    <div
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary z-10"
                        onClick={handleNext}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 w-11/12 mx-auto">
                        {testimonialsData.slice(currentSlide * 2, currentSlide * 2 + 2).map((testimonial, index) => (
                            <div key={index} className="relative group p-8 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl">
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                                <p className="text-gray-600 z-10 relative group-hover:text-white transition-colors duration-300">
                                    "{testimonial.text}"
                                </p>
                                <h3 className="mt-4 text-xl font-semibold text-gray-800 z-10 relative group-hover:text-white transition-colors duration-300">
                                    {testimonial.author}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
