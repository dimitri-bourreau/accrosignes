"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.jpeg"
                alt="Accrosignes logo"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <span className="font-bold text-base sm:text-lg text-gray-900">
                Accrosignes
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex gap-8 text-sm text-gray-600 font-medium">
              <Link href="/" className="cursor-pointer hover:text-teal-600 transition duration-200">
                Accueil
              </Link>
              <Link href="/cours-de-lsf" className="cursor-pointer hover:text-teal-600 transition duration-200">
                Cours
              </Link>
              <Link href="/actualites" className="cursor-pointer hover:text-teal-600 transition duration-200">
                Actualités
              </Link>
              <Link href="/agenda" className="cursor-pointer hover:text-teal-600 transition duration-200">
                Agenda
              </Link>
              <Link href="/espace-membre" className="cursor-pointer hover:text-teal-600 transition duration-200">
                Espace membres
              </Link>
              <Link href="/donner" className="cursor-pointer hover:text-teal-600 transition duration-200">
                Donner
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="sm:hidden cursor-pointer p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-gray-900 transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-gray-900 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-gray-900 transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden animate-fadeInBlur"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 sm:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer p-2"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <div className="w-6 h-6 relative">
            <span className="absolute block h-0.5 w-full bg-gray-900 rotate-45 top-1/2"></span>
            <span className="absolute block h-0.5 w-full bg-gray-900 -rotate-45 top-1/2"></span>
          </div>
        </button>

        <div className="flex flex-col p-6 space-y-6 mt-16">
          <Link
            href="/"
            className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            href="/cours-de-lsf"
            className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Cours
          </Link>
          <Link
            href="/actualites"
            className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Actualités
          </Link>
          <Link
            href="/agenda"
            className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Agenda
          </Link>
          <Link
            href="/espace-membre"
            className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Espace membres
          </Link>
          <Link
            href="/donner"
            className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Donner
          </Link>
        </div>
      </div>
    </>
  );
}
