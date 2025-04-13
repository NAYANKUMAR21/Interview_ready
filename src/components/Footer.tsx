import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-300 mt-16 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: Branding or Logo */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-slate-800">MockMate</h2>
          <p className="text-slate-600 text-sm">Get Ready for interview </p>
          <p className="text-slate-600 text-sm">
            Developed by{' '}
            <Link href="https://www.linkedin.com/in/nayan-kumar-/">
              Nayan Kumar
            </Link>
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 justify-center">
          <Link href="/about" className="hover:text-slate-800 transition">
            About
          </Link>
          <Link href="/privacy" className="hover:text-slate-800 transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-800 transition">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-slate-800 transition">
            Contact
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-center sm:text-right text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} MockMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
