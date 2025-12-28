"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Sparkles, Share2 } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-32 bg-white overflow-hidden"
    >
              <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[440px] w-[440px] rounded-full bg-blue-400/12 blur-[170px]" />
      </div>


      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div
          className={`
            mx-auto max-w-3xl text-center
            transition-all duration-800 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            We believe knowledge should work for you
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Not get buried in bookmarks, tabs, screenshots, and forgotten notes.
          </p>
        </div>

        {/* Content grid */}
        <div className="mt-20 grid gap-10 lg:grid-cols-3">
          {/* Block 1 */}
          <div
            className={`
              rounded-2xl border border-blue-100/70 bg-white p-8
              transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Brain className="h-5 w-5" />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900">
              The problem we saw
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              The internet is full of valuable ideas — but most of them disappear
              the moment we close a tab. Knowledge is scattered, fragile, and
              hard to resurface.
            </p>
          </div>

          {/* Block 2 (highlighted / creative) */}
          <div
            className={`
              relative rounded-2xl
              border border-blue-200/80
              bg-gradient-to-b from-blue-50/70 to-white
              p-9
              shadow-[0_20px_50px_-30px_rgba(37,99,235,0.35)]
              transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "220ms" }}
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Sparkles className="h-5 w-5" />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900">
              Our philosophy
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              BrainBin is built around one idea — your knowledge should evolve
              with you. Every link, video, note, or thought becomes part of a
              living system that grows smarter over time.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Not another tool. A thinking companion.
            </p>
          </div>

          {/* Block 3 */}
          <div
            className={`
              rounded-2xl border border-blue-100/70 bg-white p-8
              transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "320ms" }}
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Share2 className="h-5 w-5" />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900">
              Built for sharing & growth
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Whether you’re learning alone or building ideas with others,
              BrainBin lets you share your brain — selectively, safely, and
              intentionally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
