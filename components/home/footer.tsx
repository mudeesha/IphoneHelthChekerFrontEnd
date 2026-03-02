'use client';

import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-[#2C2C2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-[#A0A0A0] hover:text-white transition-colors duration-150 font-normal text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-[#A0A0A0] hover:text-white transition-colors duration-150 font-normal text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-[#A0A0A0] hover:text-white transition-colors duration-150 font-normal text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-[#A0A0A0] hover:text-white transition-colors duration-150 font-normal text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#A0A0A0] hover:text-white transition-colors duration-150 font-normal text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#blog" className="text-[#A0A0A0] hover:text-white transition-colors duration-150 font-normal text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors font-light">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors font-light">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-gray-300" />
              </a>
              <a
                href="https://github.com"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm font-light">
            &copy; {currentYear} iPhone Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
