'use client';

import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pathnames = ['/profile', '/dashboard', '/signin', '/signup'];

const Footer = () => {
  const pathname = usePathname();

  if (pathnames.includes(pathname)) {
    return null;
  }

  return (
    <footer className="py-8 px-4 border-t">
      <div className="container mx-auto">
        {/* 🔹 Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 🔹 About Section */}
          <div>
            <h2 className="text-lg font-semibold">Work Hive</h2>
            <p className="mt-2">
              Find your dream job with ease. Browse listings from top companies
              worldwide.
            </p>
          </div>

          {/* 🔹 Quick Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* 🔹 Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="mt-3 flex space-x-4">
              <Link href="/" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="/" aria-label="Twitter">
                <Twitter />
              </Link>
              <Link href="/" aria-label="LinkedIn">
                <Linkedin />
              </Link>
              <Link href="/" aria-label="GitHub">
                <Github />
              </Link>
            </div>
          </div>
        </div>

        {/* 🔹 Copyright */}
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} <strong>WorkHive</strong>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
