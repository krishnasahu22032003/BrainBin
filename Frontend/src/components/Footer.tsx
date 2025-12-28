"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-white overflow-hidden">

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />


      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[260px] w-[260px] rounded-full bg-blue-400/8 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <div className="text-center">
          <div className="text-sm font-semibold text-neutral-900">
            BrainBin
          </div>
          <p className="mt-1 text-xs text-neutral-600">
            A calm place for your ideas and knowledge.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-neutral-600">
          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="#faq" className="hover:text-blue-600 transition">
            FAQ
          </a>
        </div>


        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>
              by{" "}
              <span className="font-medium text-neutral-700">
                Krishna Sahu
              </span>
            </span>
          </div>

          <span className="hidden sm:inline">•</span>

          <span>© {new Date().getFullYear()} BrainBin</span>
        </div>
      </div>
    </footer>
  );
}
