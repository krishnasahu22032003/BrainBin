"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What exactly is BrainBin?",
    answer:
      "BrainBin is a second brain for your digital life. It helps you store, organize, and connect knowledge from links, videos, posts, and notes into one evolving thinking space.",
  },
  {
    question: "What kind of content can I save?",
    answer:
      "You can save articles, YouTube videos, X and Facebook posts, links, notes, and personal thoughts. BrainBin brings everything together in a structured, searchable way.",
  },
  {
    question: "How is this different from bookmarks or note apps?",
    answer:
      "Traditional tools store information. BrainBin helps you think with it. Your content is connected, summarized, and easy to resurface when you need it most.",
  },
  {
    question: "Can I share my BrainBin with others?",
    answer:
      "Yes. You can share specific collections, ideas, or even your entire knowledge space — privately or publicly — while staying in control.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. BrainBin is private by default. You own your data, decide what to share, and can export your knowledge anytime.",
  },
  {
    question: "Who is BrainBin built for?",
    answer:
      "BrainBin is built for learners, creators, founders, researchers, and anyone who wants clarity instead of information overload.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      id="faq"
      ref={sectionRef}
      className="relative py-28 sm:py-32 bg-white overflow-hidden"
    >
      {/* Ambient background */}
   
              <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[440px] w-[440px] rounded-full bg-blue-400/12 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Header */}
        <div
          className={`
            mx-auto max-w-2xl text-center
            transition-all duration-800 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Questions, answered thoughtfully
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Everything you need to know about building and using your second
            brain with BrainBin.
          </p>
        </div>

        {/* FAQ items */}
        <div className="mt-16 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`
                  rounded-2xl border border-blue-100/70
                  bg-white/95
                  transition-all duration-500 ease-out
                  ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : i)
                  }
                  className="
                    w-full flex items-center justify-between
                    gap-4 px-6 py-5
                    text-left
                  "
                >
                  <span className="text-sm sm:text-base font-medium text-neutral-900">
                    {faq.question}
                  </span>

                  <span className="
                    flex h-8 w-8 items-center justify-center
                    rounded-full bg-blue-50 text-blue-600
                    transition-transform duration-300
                  ">
                    {isOpen ? (
                      <Minus className="h-4 w-4 cursor-pointer" />
                    ) : (
                      <Plus className="h-4 w-4 cursor-pointer" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`
                    overflow-hidden px-6
                    transition-all duration-500 ease-out
                    ${
                      isOpen
                        ? "max-h-40 pb-5 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
