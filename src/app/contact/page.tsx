"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from '@/components/Header'
import Newsletter from '@/components/Newsletter'
import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                                    Contact DME Store
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                                    We're here to help. Reach out to us for any questions or support.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                                <p className="text-gray-700 mb-4">
                                    Have a question about our products or services? Our team is ready to assist you.
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input type="text" placeholder="Your Name" required />
                                    <Input type="email" placeholder="Your Email" required />
                                    <Input type="tel" placeholder="Your Phone Number" />
                                    <Textarea placeholder="Your Message" required />
                                    <Button type="submit">Send Message</Button>
                                </form>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <Phone className="mr-2 h-5 w-5 text-primary" />
                                            <span>+1 (555) 123-4567</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Mail className="mr-2 h-5 w-5 text-primary" />
                                            <span>support@dmestore.com</span>
                                        </li>
                                        <li className="flex items-center">
                                            <MapPin className="mr-2 h-5 w-5 text-primary" />
                                            <span>123 Medical Drive, Health City, HC 12345</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <Clock className="mr-2 h-5 w-5 text-primary" />
                                            <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Clock className="mr-2 h-5 w-5 text-primary" />
                                            <span>Saturday: 10:00 AM - 4:00 PM</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Clock className="mr-2 h-5 w-5 text-primary" />
                                            <span>Sunday: Closed</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
                        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                            Our customer support team is available 24/7 to help you with any urgent inquiries.
                        </p>
                        <Button size="lg">Call Now</Button>
                    </div>
                </section>
                <Faqs />
                <Newsletter />
            </main>
            <Footer />
        </div>
    )
}
