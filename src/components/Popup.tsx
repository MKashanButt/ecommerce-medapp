import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { firstName: string; lastName: string; phone: string; email?: string }) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-0 flex flex-col md:flex-row w-full max-w-4xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-black rounded-full w-8 h-8 flex items-center justify-center p-1"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex-shrink-0 w-full md:w-1/2">
                    <img
                        src="https://www.placehold.co/400"
                        alt="Popup Image"
                        className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    />
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-lg font-bold mb-4">Join Us!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <Input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="w-full"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <Input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="w-full"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <Input
                                type="tel"
                                name="phone"
                                placeholder="Phone No"
                                className="w-full"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email (Optional)"
                                className="w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div className="flex justify-end mt-4">
                                <Button type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Popup;
