import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full px-6 py-10 grid ...">
      <div className="w-full px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-bold text-white">TrackMyClass</h1>
          <p className="mt-3 text-sm">
            A smart attendance and curriculum management platform helping
            students and teachers save time and stay aligned with academic
            goals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          <p className="text-sm">New Delhi, India</p>
          <p className="text-sm">support@trackmyclass.com</p>
          <p className="text-sm">+91 7388632735</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TrackMyClass. All rights reserved.
      </div>
    </footer>
  );
}
