"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "BrainBin completely changed how I learn. I no longer lose valuable ideas — everything connects naturally over time.",
    name: "Aarav Mehta",
    role: "Product Designer",
    image: "/image/testimonials-1.jpg",
  },
  {
    quote:
      "It feels less like a tool and more like a thinking space. My notes, links, and videos finally make sense together.",
    name: "Alex Collins",
    role: "Content Creator",
    image: "/image/testimonials-2.jpg",
  },
  {
    quote:
      "Sharing my knowledge space with my team has been a game-changer. Collaboration feels intentional and effortless.",
    name: "Daniel Wong",
    role: "Startup Founder",
    image: "/image/testimonials-3.jpg",
  },
  {
    quote:
      "I finally have a place where my learning doesn’t disappear. BrainBin feels calm, focused, and deeply thoughtful.",
    name: "Ritika Sharma",
    role: "UX Researcher",
    image: "/image/testimonials-4.jpg",
  },
  {
    quote:
      "This is the first app that actually respects how the human mind works. Everything flows naturally.",
    name: "Lucas Pereira",
    role: "Indie Hacker",
    image: "/image/testimonials-5.jpg",
  },
  {
    quote:
      "BrainBin helped me turn scattered content into structured insight. I trust it with my most important ideas.",
    name: "Emily Zhang",
    role: "Knowledge Worker",
    image: "/image/testimonials-6.jpg",
  },
];

export default function Testimonials() {
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
      id="testimonials"
      ref={sectionRef}
      className="relative py-28 sm:py-32 bg-white overflow-hidden"
    >
   
    
              <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[440px] w-[440px] rounded-full bg-blue-400/12 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        <div
          className={`
            mx-auto max-w-2xl text-center
            transition-all duration-800 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Trusted by thoughtful learners
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Designers, creators, founders, and lifelong learners building
            knowledge that lasts.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`
                group relative rounded-2xl
                border border-blue-100/70
                bg-white/95
                p-8
                transition-all duration-500 ease-out
                hover:-translate-y-2
                hover:border-blue-200
                hover:shadow-[0_20px_50px_-28px_rgba(37,99,235,0.35)]
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
              style={{ transitionDelay: `${i * 120}ms` }}
            >

              <div className="
                mb-6 inline-flex h-9 w-9 items-center justify-center
                rounded-lg bg-blue-50 text-blue-600
              ">
                <Quote className="h-4 w-4" />
              </div>

              <p className="text-sm leading-relaxed text-neutral-700">
                “{t.quote}”
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="
                    h-11 w-11 rounded-full object-cover
                    border border-blue-100
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                />

                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
