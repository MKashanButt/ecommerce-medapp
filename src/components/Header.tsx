import Link from 'next/link'
import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"

export default function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginError('');
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch(`${process.env.BACKEND_URL}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            setIsLoginForm(true);
        } catch (error) {
            console.error('Registration failed:', error);
            setLoginError('Registration failed. Please try again.');
        }
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginError('');
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data);
            setUser({ name: data.name }); // Assuming the API returns the user's name
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError(error instanceof Error ? error.message : 'Login failed. Please try again.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}logout`, {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className={`px-4 lg:px-6 h-14 flex items-center transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md z-50' : ''}`}>
            <Link className="flex items-center justify-center" href="/">
                <MedicalCrossIcon className="h-6 w-6" />
                <span className="sr-only">DME Store</span>
            </Link>
            <nav className={`ml-auto ${isMobile ? (isMenuOpen ? 'flex flex-col absolute top-14 left-0 right-0 bg-white p-4' : 'hidden') : 'flex'} gap-4 sm:gap-6`}>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
                    Home
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/products">
                    Products
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/resources">
                    Resources
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
                    About
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
                    Contact
                </Link>
            </nav>
            <div className="flex items-center ml-auto">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="mr-2" variant="ghost">
                                <User className="h-4 w-4 mr-2" />
                                <span>{user.name}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                <span>Cart</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost">Login</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{isLoginForm ? 'Login' : 'Register'}</DialogTitle>
                                <DialogDescription>
                                    {isLoginForm ? 'Enter your credentials to log in.' : 'Create a new account.'}
                                </DialogDescription>
                            </DialogHeader>
                            {isLoginForm ? (
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <Input name="email" type="email" placeholder="Email" required />
                                    <Input name="password" type="password" placeholder="Password" required />
                                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                                    <Button type="submit">Login</Button>
                                    <p className="text-sm text-gray-500">
                                        Don't have an account?{' '}
                                        <Button type="button" variant="link" className="p-0" onClick={() => setIsLoginForm(false)}>
                                            Register
                                        </Button>
                                    </p>
                                </form>
                            ) : (
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <Input name="name" type="text" placeholder="Name" required />
                                    <Input name="email" type="email" placeholder="Email" required />
                                    <Input name="password" type="password" placeholder="Password" required />
                                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                                    <Button type="submit">Register</Button>
                                    <p className="text-sm text-gray-500">
                                        Already have an account?{' '}
                                        <Button type="button" variant="link" className="p-0" onClick={() => setIsLoginForm(true)}>
                                            Login
                                        </Button>
                                    </p>
                                </form>
                            )}
                        </DialogContent>
                    </Dialog>
                )}
                {isMobile && (
                    <Button size="icon" variant="ghost" onClick={toggleMenu}>
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                    </Button>
                )}
            </div>
        </header>
    )
}

function MedicalCrossIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 4h8a2 2 0 0 1 2 2v2" />
            <path d="M14 20h-4a2 2 0 0 1-2-2v-2" />
            <path d="M4 8v8a2 2 0 0 0 2 2h2" />
            <path d="M20 14v-4a2 2 0 0 0-2-2h-2" />
            <path d="M8 12h8" />
            <path d="M12 16V8" />
        </svg>
    )
}