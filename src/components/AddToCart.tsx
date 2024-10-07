"use client"
import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { setRequestMeta } from 'next/dist/server/request-meta'

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
};

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const [isCartDialogOpen, setIsCartDialogOpen] = useState(false)
    const [user, setUser] = useState('')

    const handleAddToCart = () => {
        setIsCartDialogOpen(true)
        // Add product to cart logic here
    }

    if (!user) {
        return (
            <div className="text-sm text-gray-500 italic">
                Please log in to add to cart
            </div>
        )
    }

    return (
        <>
            <Button onClick={handleAddToCart}>
                Add to Cart
            </Button>

            <Dialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Added to Cart
                        </DialogTitle>
                        <DialogDescription>
                            The following item has been added to your cart.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-4 py-4">
                        <img
                            src={`https://placehold.co/100x100?text=${encodeURIComponent(product.name)}`}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsCartDialogOpen(false)}
                        >
                            Continue Shopping
                        </Button>
                        <Button type="button" onClick={() => {
                            // Implement view cart functionality
                            setIsCartDialogOpen(false)
                        }}>
                            View Cart
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}