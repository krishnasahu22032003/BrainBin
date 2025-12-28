"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import HeaderButton from "./Headerbutton";

export default function CTA() {
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
      { threshold: 0.35 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-32 sm:py-36 bg-white overflow-hidden"
    >

   
              <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[440px] w-[440px] rounded-full bg-blue-400/12 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div
          className={`
            group relative overflow-hidden rounded-3xl
            border border-blue-200/70
            bg-gradient-to-b from-blue-50/80 to-white
            px-8 py-16 sm:px-16 sm:py-20
            text-center
            transition-all duration-1000 ease-out
            ${
              visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-[0.97]"
            }
            hover:-translate-y-1
            hover:shadow-[0_35px_90px_-45px_rgba(37,99,235,0.45)]
          `}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="
              absolute -top-32 left-1/2 -translate-x-1/2
              h-[320px] w-[320px]
              rounded-full bg-blue-400/25
              blur-[140px]
              transition-opacity duration-700
              opacity-70 group-hover:opacity-100
            " />
          </div>

          <div className="relative z-10">

            <h2
              className={`
                text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900
                transition-all duration-700 delay-150
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
              `}
            >
              Give your ideas a place to live
            </h2>

            <p
              className={`
                mt-6 max-w-2xl mx-auto
                text-base leading-relaxed text-neutral-600
                transition-all duration-700 delay-300
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
              `}
            >
              Stop losing valuable thoughts across tabs, apps, and bookmarks.
              Build a calm, connected second brain that grows with you.
            </p>

            <div
              className={`
                mt-12 flex justify-center
                transition-all duration-700 delay-500
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
              `}
            >
              <HeaderButton
                variant="primary"
                to="/signup"
                className="
                  group/btn inline-flex items-center gap-2
                  shadow-[0_22px_50px_-28px_rgba(37,99,235,0.5)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_30px_65px_-25px_rgba(37,99,235,0.6)]
                "
              >
                Start building your second brain
                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform duration-300
                    group-hover/btn:translate-x-1.5
                  "
                />
              </HeaderButton>
            </div>

            <p
              className={`
                mt-6 text-xs text-neutral-500
                transition-all duration-700 delay-700
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }
              `}
            >
              Free to get started · No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
