"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Newsletter from '@/components/Newsletter'
import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                                    About DME Store
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                                    Empowering lives through quality medical equipment and exceptional service.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                                <p className="text-gray-700 mb-4">
                                    Founded in 2005, DME Store has been at the forefront of providing high-quality durable medical equipment to individuals and healthcare facilities. Our journey began with a simple mission: to improve the quality of life for those in need of medical equipment.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    Over the years, we've grown from a small local shop to a nationwide provider, but our commitment to personalized care and top-notch service remains unchanged.
                                </p>
                                <Button>Learn More</Button>
                            </div>
                            <div className="relative h-[400px]">
                                <img
                                    src="https://placehold.co/600x400?text=Our+Story"
                                    alt="Our Story"
                                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Quality</h3>
                                <p className="text-gray-700">We are committed to providing only the highest quality medical equipment to ensure the safety and comfort of our customers.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Customer-Centric</h3>
                                <p className="text-gray-700">Our customers are at the heart of everything we do. We strive to provide personalized solutions and exceptional service.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                <p className="text-gray-700">We continuously seek out and offer the latest advancements in medical equipment technology to improve patient outcomes.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
                        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8">
                            At DME Store, our mission is to enhance the quality of life for individuals with medical needs by providing top-quality durable medical equipment, exceptional customer service, and comprehensive support. We strive to be a trusted partner in healthcare, empowering our customers to live more comfortably and independently.
                        </p>
                        <div className="flex justify-center">
                            <Button>Learn More About Our Mission</Button>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Commitment to Sustainability</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-gray-700 mb-4">
                                    At DME Store, we're committed to reducing our environmental impact. We've implemented eco-friendly practices throughout our operations, from sourcing sustainable materials to minimizing waste in our packaging.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    We also offer a recycling program for used medical equipment, ensuring that these items are disposed of responsibly or refurbished for continued use.
                                </p>
                                <Button>Learn About Our Green Initiatives</Button>
                            </div>
                            <div className="relative h-[300px]">
                                <img
                                    src="https://placehold.co/600x400?text=Sustainability"
                                    alt="Sustainability"
                                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold mb-8 text-center">Community Involvement</h2>
                        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8">
                            We believe in giving back to the communities we serve. DME Store actively participates in local health initiatives, sponsors community events, and partners with healthcare organizations to improve access to quality medical equipment for those in need.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">Local Partnerships</h3>
                                <p className="text-gray-700">We collaborate with local hospitals and clinics to ensure patients have access to the equipment they need.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">Education Programs</h3>
                                <p className="text-gray-700">We offer workshops and seminars to educate the community about proper use and maintenance of medical equipment.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">Charitable Donations</h3>
                                <p className="text-gray-700">We regularly donate equipment to underserved communities and disaster relief efforts.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-gray-50">
                    <div className="container px-4 md:px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Experience the DME Store Difference?</h2>
                        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who have found the perfect medical equipment solutions with us.
                        </p>
                        <Button size="lg">Shop Now</Button>
                    </div>
                </section>

                <Faqs />
                <Newsletter />
            </main>
            <Footer />
        </div>
    )
}
