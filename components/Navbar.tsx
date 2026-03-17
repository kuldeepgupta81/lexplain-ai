"use client";

import Link from "next/link";
import { Mic } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Lexplain AI
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-6 items-center text-gray-700 font-medium">

          <Link href="/scanner" className="hover:text-blue-600 transition">
            Document Scanner
          </Link>

          <Link href="/bill-explainer" className="hover:text-blue-600 transition">
            Bill Explainer
          </Link>

          <Link href="/legal-writer" className="hover:text-blue-600 transition">
            Legal Writer
          </Link>

          <Link href="/fir-helper" className="hover:text-blue-600 transition">
            FIR Helper
          </Link>

          {/* MIC BUTTON (future AI feature) */}
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-full shadow">
            <Mic size={20} />
          </button>

        </div>
      </div>
    </nav>
  );
}