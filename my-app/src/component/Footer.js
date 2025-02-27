import React from "react";
import logof from "../image/logof.png";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-8">
      {/* Footer Container */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <img src={logof} alt="Boutique Logo" className="h-22" />
          <p className="text-sm text-center md:text-left">Pam Boutique © 2025</p>
        </div>

        {/* Categories Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>Roundneck Tshirt</li>
            <li>Polo Tshirt</li>
            <li>Oversized Tshirt</li>
            <li>Hoodies</li>
          </ul>
        </div>

        {/* Information Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Information</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Shipping Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          <p className="text-sm">
            <strong>Address:</strong> 24/7 pam boutique, opp pooja party plot,
            keshavbaug, Ahmedabad, India
          </p>
          <p className="text-sm mt-2">
            <strong>Mobile:</strong> +91 12345 67890
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-8 pt-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Social Icons */}
          <div className="flex space-x-6 text-gray-500">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaFacebook className="text-lg cursor-pointer" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
            >
              <FaYoutube className="text-lg cursor-pointer" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition"
            >
              <FaInstagram className="text-lg cursor-pointer" />
            </a>
          </div>

          {/* Footer Text */}
          <p className="text-sm text-gray-500">Pam Boutique © 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
