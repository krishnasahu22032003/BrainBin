"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Layers,
  Search,
  Sparkles,
  Share2,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Build a true second brain",
    description:
      "Save knowledge from videos, links, posts, and notes — all structured into a personal thinking system.",
  },
  {
    icon: Layers,
    title: "Everything in one place",
    description:
      "Collect content from YouTube, X, Facebook, articles, and the web without fragmentation or clutter.",
  },
  {
    icon: Search,
    title: "Recall anything instantly",
    description:
      "Find ideas when you need them using powerful semantic search — even months later.",
  },
  {
    icon: Sparkles,
    title: "Automatic summaries & insights",
    description:
      "Turn long content into clear takeaways so you focus on thinking, not rereading.",
  },
  {
    icon: Share2,
    title: "Share your brain with others",
    description:
      "Collaborate by sharing collections, ideas, or your entire knowledge space — privately or publicly.",
  },
  {
    icon: Lock,
    title: "Private by default",
    description:
      "Your data stays yours. Designed with privacy, control, and ownership at its core.",
  },
];

export default function Features() {
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
    id="features"
      ref={sectionRef}
      className=" relative py-28 sm:py-32 bg-white overflow-hidden"
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
          <h2 className="
            text-3xl sm:text-4xl
            font-bold
            tracking-tight
            text-neutral-900
          ">
            A calm, powerful place for your knowledge
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            BrainBin helps you capture, connect, and resurface ideas — without
            complexity or noise.
          </p>
        </div>

        <div className="mt-18 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={i}
                className={`
                  group relative rounded-2xl
                  border border-blue-100/70
                  bg-white/90
                  p-8
                  transition-all duration-500 ease-out
                  hover:-translate-y-2 hover:border-blue-200
                  hover:shadow-[0_16px_40px_-20px_rgba(37,99,235,0.25)]
                  ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                `}
                style={{ transitionDelay: `${i * 100}ms` }}
              >

                <div className="
                  mb-6 inline-flex h-12 w-12 items-center justify-center
                  rounded-xl
                  border border-blue-100
                  bg-blue-50
                  text-blue-600
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                ">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="
                  text-lg font-semibold text-neutral-900
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                ">
                  {feature.title}
                </h3>
                <p className="
                  mt-3 text-sm leading-relaxed text-neutral-600
                  transition-all duration-300
                  group-hover:text-neutral-700
                ">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
