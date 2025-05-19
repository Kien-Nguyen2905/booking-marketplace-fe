'use client';
import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
          {/* About Section */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-800 border-b pb-2 border-gray-200">
              About Us
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We are your trusted partner for finding the perfect accommodation
              for your travels. We offer a wide range of options to suit every
              budget and preference.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <Link
                href="#"
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-800 border-b pb-2 border-gray-200">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">Hotels & Resorts</li>
              <li className="text-sm text-gray-600">Apartments</li>
              <li className="text-sm text-gray-600">Villas & Vacation Homes</li>
              <li className="text-sm text-gray-600">
                Hostels & Backpacker Lodges
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
      </div>

      {/* Footer bottom */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          &copy; {currentYear} Booking. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-6 text-xs text-gray-500">
          <Link href="#" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
