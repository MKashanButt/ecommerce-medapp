import React, { useState } from "react";

interface Toggle {
    index: string
}

export default function Faqs() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is durable medical equipment?",
            answer: "Durable medical equipment (DME) is any medical equipment that provides therapeutic benefits to a patient in need due to certain medical conditions and/or illnesses."
        },
        {
            question: "How can I place an order?",
            answer: "You can place an order directly through our website or contact our customer support for assistance."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods, including credit/debit cards and PayPal."
        },
    ];

    const toggleOpen = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-12 md:py-24 lg:pt-32 bg-gray-100">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <div
                                className={`p-4 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-300 ease-in-out ${openIndex === index ? 'bg-[#2563eb]' : 'bg-gray-800'}`}
                                onClick={() => toggleOpen(index)}
                            >
                                <h3 className="font-semibold text-lg text-white">{faq.question}</h3>
                                <span className={`text-xl text-white transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                                    &#43;
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
                            >
                                <p className={`p-4 bg-white text-black mt-2`}>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
