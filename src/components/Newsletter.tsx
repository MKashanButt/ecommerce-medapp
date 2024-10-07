import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Newsletter() {
    const [subscriptionStatus, setSubscriptionStatus] = React.useState<string | null>(null)

    function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setSubscriptionStatus('Thank you for subscribing!')
    }

    return (
        <section className="w-full py-12 md:py-24 bg-gray-100">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Stay Informed</h2>
                <div className="flex flex-col items-center space-y-4 text-center">
                    <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                        Subscribe to our newsletter for the latest updates on medical equipment and health tips.
                    </p>
                    <div className="w-full max-w-sm space-y-2">
                        <form className="flex space-x-2" onSubmit={handleSubscribe}>
                            <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" required />
                            <Button type="submit">Subscribe</Button>
                        </form>
                        {subscriptionStatus && <p className="text-sm text-green-600">{subscriptionStatus}</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}