"use client"
import React, { useState, useEffect } from 'react'
import { Search, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from '@/components/Header'
import Newsletter from '@/components/Newsletter'
import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'

type Resource = {
    id: number;
    title: string;
    description: string;
    category: 'Blog' | 'Article' | 'Industry News' | 'Video' | 'Infographic';
    date: string;
    imageUrl: string;
    author: string;
    readTime: string;
    tags: string[];
}

const initialResources: Resource[] = [
    {
        id: 1,
        title: "The Future of Home Healthcare",
        description: "Explore the latest trends in home healthcare technology and how they're improving patient outcomes.",
        category: "Blog",
        date: "2023-05-15",
        imageUrl: "https://placehold.co/600x400?text=Healthcare",
        author: "Jane Doe",
        readTime: "5 min",
        tags: ["healthcare", "technology", "trends"],
    },
    {
        id: 2,
        title: "Choosing the Right Mobility Aid",
        description: "A comprehensive guide to selecting the best mobility aid for your specific needs.",
        category: "Article",
        date: "2023-06-02",
        imageUrl: "https://placehold.co/600x400?text=Mobility+Aids",
        author: "John Smith",
        readTime: "8 min",
        tags: ["mobility", "aids", "guide"],
    },
    {
        id: 3,
        title: "New Regulations in Medical Equipment Manufacturing",
        description: "Stay informed about the latest regulatory changes affecting the medical equipment industry.",
        category: "Industry News",
        date: "2023-06-10",
        imageUrl: "https://placehold.co/600x400?text=Regulations",
        author: "Emily Johnson",
        readTime: "6 min",
        tags: ["regulations", "manufacturing", "industry"],
    },
    {
        id: 4,
        title: "Advancements in Respiratory Care Equipment",
        description: "Discover the latest innovations in respiratory care devices and their impact on patient treatment.",
        category: "Article",
        date: "2023-06-20",
        imageUrl: "https://placehold.co/600x400?text=Respiratory+Care",
        author: "Michael Brown",
        readTime: "7 min",
        tags: ["respiratory", "equipment", "innovation"],
    },
    {
        id: 5,
        title: "The Role of AI in Medical Diagnostics",
        description: "Explore how artificial intelligence is revolutionizing medical diagnostics and improving accuracy.",
        category: "Blog",
        date: "2023-06-25",
        imageUrl: "https://placehold.co/600x400?text=AI+Diagnostics",
        author: "Sarah Lee",
        readTime: "10 min",
        tags: ["AI", "diagnostics", "technology"],
    },
    {
        id: 6,
        title: "Global Medical Device Market Trends",
        description: "An overview of the current trends shaping the global medical device market.",
        category: "Industry News",
        date: "2023-07-01",
        imageUrl: "https://placehold.co/600x400?text=Market+Trends",
        author: "David Wilson",
        readTime: "9 min",
        tags: ["market", "trends", "global"],
    },
    {
        id: 7,
        title: "Telemedicine: Revolutionizing Healthcare Access",
        description: "How telemedicine is breaking down barriers and improving healthcare accessibility.",
        category: "Article",
        date: "2023-07-05",
        imageUrl: "https://placehold.co/600x400?text=Telemedicine",
        author: "Lisa Chen",
        readTime: "8 min",
        tags: ["telemedicine", "healthcare", "accessibility"],
    },
    {
        id: 8,
        title: "The Impact of 3D Printing on Medical Devices",
        description: "Exploring the revolutionary applications of 3D printing in medical device manufacturing.",
        category: "Blog",
        date: "2023-07-10",
        imageUrl: "https://placehold.co/600x400?text=3D+Printing",
        author: "Robert Taylor",
        readTime: "7 min",
        tags: ["3D printing", "medical devices", "manufacturing"],
    },
    {
        id: 9,
        title: "Emerging Trends in Wearable Health Technology",
        description: "A look at the latest innovations in wearable devices for health monitoring and management.",
        category: "Infographic",
        date: "2023-07-15",
        imageUrl: "https://placehold.co/600x400?text=Wearable+Tech",
        author: "Emma White",
        readTime: "5 min",
        tags: ["wearables", "health tech", "innovation"],
    },
    {
        id: 10,
        title: "The Evolution of Prosthetics: From Basic to Bionic",
        description: "Tracing the incredible journey of prosthetic limbs from simple wooden appendages to advanced, brain-controlled bionics.",
        category: "Article",
        date: "2023-07-20",
        imageUrl: "https://placehold.co/600x400?text=Prosthetics",
        author: "Dr. Alex Johnson",
        readTime: "12 min",
        tags: ["prosthetics", "bionics", "medical technology"],
    },
    {
        id: 11,
        title: "Understanding Medicare Coverage for Durable Medical Equipment",
        description: "A comprehensive guide to navigating Medicare coverage for various types of durable medical equipment.",
        category: "Blog",
        date: "2023-07-25",
        imageUrl: "https://placehold.co/600x400?text=Medicare+Coverage",
        author: "Maria Rodriguez",
        readTime: "10 min",
        tags: ["Medicare", "insurance", "DME"],
    },
    {
        id: 12,
        title: "The Rise of Robotics in Surgery",
        description: "Exploring how robotic systems are enhancing surgical precision and patient outcomes.",
        category: "Video",
        date: "2023-07-30",
        imageUrl: "https://placehold.co/600x400?text=Robotic+Surgery",
        author: "Dr. James Lee",
        readTime: "15 min",
        tags: ["robotics", "surgery", "medical innovation"],
    },
    {
        id: 13,
        title: "The Importance of Ergonomics in Medical Equipment Design",
        description: "Understanding how ergonomic design principles are improving the usability and effectiveness of medical equipment.",
        category: "Article",
        date: "2023-08-05",
        imageUrl: "https://placehold.co/600x400?text=Ergonomic+Design",
        author: "Dr. Samantha Brown",
        readTime: "11 min",
        tags: ["ergonomics", "design", "medical equipment"],
    },
    {
        id: 14,
        title: "Navigating the Challenges of Home Care: A Caregiver's Guide",
        description: "Practical advice and strategies for caregivers managing home care responsibilities.",
        category: "Blog",
        date: "2023-08-10",
        imageUrl: "https://placehold.co/600x400?text=Home+Care",
        author: "Jennifer Adams",
        readTime: "9 min",
        tags: ["home care", "caregiving", "patient support"],
    },
];

export default function Resources() {
    const [searchQuery, setSearchQuery] = useState('')
    const [resources] = useState<Resource[]>(initialResources)
    const [filteredResources, setFilteredResources] = useState<Resource[]>(initialResources)
    const [currentPage, setCurrentPage] = useState(1)
    const resourcesPerPage = 6

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    const handleSearch = () => {
        const filtered = resources.filter(resource =>
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        setFilteredResources(filtered)
        setCurrentPage(1)
    }

    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const PaginationButtons = () => (
        <div className="flex justify-end mt-4 space-x-4">
            <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-2"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
            </Button>
            <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastResource >= filteredResources.length}
                className="flex items-center space-x-2"
            >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                                    Resources
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                                    Stay informed with our latest blogs, articles, and industry news.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <div className="flex space-x-2">
                                    <Input
                                        className="max-w-lg flex-1"
                                        placeholder="Search resources..."
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button type="button" variant="outline" onClick={handleSearch}>
                                        <Search className="h-4 w-4" />
                                        <span className="sr-only">Search</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <PaginationButtons />
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                            {currentResources.map((resource, index) => {
                                const cycleIndex = index % 7;
                                if (cycleIndex >= 4 && cycleIndex <= 6) {
                                    return (
                                        <div key={resource.id} className="md:col-span-4 flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative before:absolute before:inset-0 before:border-2 before:border-transparent before:rounded-lg before:transition-all before:duration-300 hover:before:border-primary">
                                            <div className="relative">
                                                <img src={resource.imageUrl} alt={resource.title} className="w-full h-48 object-cover" />
                                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 m-2 rounded">
                                                    {resource.category}
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-500">{resource.date}</span>
                                                    <span className="text-sm text-gray-500">{resource.readTime} read</span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-gray-800">{resource.title}</h3>
                                                <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {resource.tags.map((tag, index) => (
                                                        <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Button variant="outline" className="self-start mt-auto">Read More</Button>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={resource.id} className={`${cycleIndex % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative before:absolute before:inset-0 before:border-2 before:border-transparent before:rounded-lg before:transition-all before:duration-300 hover:before:border-primary`}>
                                            <div className="relative">
                                                <img src={resource.imageUrl} alt={resource.title} className="w-full h-48 object-cover" />
                                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 m-2 rounded">
                                                    {resource.category}
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-500">{resource.date}</span>
                                                    <span className="text-sm text-gray-500">{resource.readTime} read</span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-gray-800">{resource.title}</h3>
                                                <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {resource.tags.map((tag, index) => (
                                                        <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Button variant="outline" className="self-start mt-auto">Read More</Button>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <PaginationButtons />
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-primary">
                            Why Our Resources Matter
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Expert Insights</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    Gain valuable knowledge from industry experts and healthcare professionals.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Stay Informed</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    Keep up-to-date with the latest news and trends in the medical equipment industry.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
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
                                <h3 className="text-xl font-bold text-gray-800">Empower Your Decisions</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    Make informed choices about your health and medical equipment needs.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Enhance Your Knowledge</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    Broaden your understanding of medical equipment and healthcare practices.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Community Support</h3>
                                <p className="mt-2 text-sm text-gray-700">
                                    Connect with others facing similar health challenges and share experiences.
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