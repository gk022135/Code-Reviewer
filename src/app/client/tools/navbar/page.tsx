"use client";

import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 z-20 bg-black/50 backdrop-blur-2xl w-screen">
            <nav className="relative z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <a href="/">
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                CodeReviewer
                            </span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#features"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            How it Works
                        </a>
                        <a
                            href="#testimonials"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Reviews
                        </a>
                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-md p-6 md:hidden">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#features"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                How it Works
                            </a>
                            <a
                                href="#testimonials"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Reviews
                            </a>
                            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
