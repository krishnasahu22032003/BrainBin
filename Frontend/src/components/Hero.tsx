"use client";

import { Sparkles, Brain, TrendingUp, Share2 } from "lucide-react";
import HeaderButton from "./Headerbutton";

const users = [
  "/image/testimonials-1.jpg",
  "/image/testimonials-2.jpg",
  "/image/testimonials-3.jpg",
  "/image/testimonials-4.jpg",
  "/image/testimonials-5.jpg",
  "/image/testimonials-6.jpg",
];

const Hero = () => {
  return (
    <section
      id="home"
      className="
        relative overflow-hidden
        min-h-screen
        flex justify-center
        pt-28 sm:pt-32
        bg-gradient-to-b from-blue-50 via-white to-white
      "
    >
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-blue-400/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/4 -right-40 h-[480px] w-[480px] rounded-full bg-indigo-400/15 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="
          mx-auto mb-6 inline-flex items-center gap-2
          rounded-full border border-blue-200/60
          bg-white/70 backdrop-blur
          px-4 py-1.5
          text-xs font-medium text-blue-700
          shadow-sm
        ">
          <Sparkles className="h-4 w-4" />
          AI-powered second brain for modern learning
        </div>

        {/* Heading */}
        <h1 className="
          text-4xl sm:text-5xl lg:text-6xl
          font-bold tracking-tight
          text-neutral-900
        ">
          <span className="hidden sm:block">
            <span className="block">Turn everything you learn</span>
            <span className="mt-2 flex items-center justify-center gap-3">
              <span>into a</span>
              <Brain className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
              <span>second brain</span>
            </span>
          </span>

          <span className="sm:hidden">
            <span className="block">Turn everything you</span>
            <span className="mt-2 flex items-center justify-center gap-2">
              <span>learn into a</span>
              <Brain className="h-6 w-6 text-blue-600" />
            </span>
            <span className="mt-2 block">second brain</span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="
          mt-6 text-base sm:text-lg
          text-neutral-600 leading-relaxed
          max-w-2xl mx-auto
        ">
          BrainBin helps you save, organize, and connect knowledge from
          <span className="font-medium text-neutral-800">
            {" "}X, YouTube, articles, links, and notes
          </span>
          . Build clarity over time, resurface insights instantly, and never
          lose valuable information again.
        </p>

        {/* Supporting line */}
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-neutral-500">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          Learn faster. Think clearer. Grow continuously.
        </div>

        {/* CTA */}
        <div className="mt-7 flex items-center justify-center">
          <HeaderButton variant="primary" to="/signup">
            Build Your Second Brain
          </HeaderButton>
        </div>

        {/* Micro hint */}
        <div className="mt-5 inline-flex items-center gap-2 text-xs text-neutral-500">
          <Share2 className="h-4 w-4" />
          Share your brain with others. Collaborate effortlessly.
        </div>

        {/* ✅ TRUSTED BY USERS */}
     {/* ✅ TRUSTED BY USERS */}
<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
  {/* Avatars */}
  <div className="flex items-center">
    {users.map((src, i) => (
      <div
        key={i}
        className="
          -ml-2 first:ml-0
          h-8 w-8 sm:h-8 sm:w-8
          rounded-full
          bg-white
          p-[2px]
          shadow-md
          transition-all duration-300
          hover:-translate-y-1 hover:z-10
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(59,130,246,0.35))",
        }}
      >
        <div className="h-full w-full rounded-full bg-white">
          <img
            src={src}
            alt="User avatar"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    ))}
  </div>

  {/* Text */}
  <div className="text-sm text-neutral-600 text-center sm:text-left leading-tight">
    <div className="font-medium text-neutral-900">
      Trusted by 1000+ users
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Hero;
