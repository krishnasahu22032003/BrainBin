import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderButton from "./Headerbutton";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        bg-white/60 backdrop-blur-xl
        border-b border-neutral-200/60
        supports-[backdrop-filter]:bg-white/50
      "
    >
      <div
        className="
          max-w-5xl mx-auto
          px-5 sm:px-6
          h-16
          flex items-center justify-between
        "
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 group"
        >
          <img
            src="/image/logo.png"
            alt="Brain Bin Logo"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />

          <span
            className="
              text-lg sm:text-xl font-semibold tracking-tight
              bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900
              bg-clip-text text-transparent
            "
          >
            Brain<span className="font-bold">Bin</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                relative text-[13.5px] font-medium
                text-neutral-600
                transition-colors duration-300
                hover:text-neutral-900
                after:absolute after:-bottom-1 after:left-0
                after:h-[2px] after:w-0
                after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <HeaderButton variant="secondary" to="/signin">
            Sign In
          </HeaderButton>
          <HeaderButton variant="primary" to="/signup">
            Get Started
          </HeaderButton>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            inline-flex items-center justify-center
            h-9 w-9 rounded-md
            border border-neutral-300
            bg-white/80
            backdrop-blur
            transition
            hover:bg-neutral-100
          "
          aria-label="Toggle Menu"
        >
          <div className="space-y-1">
            <span
              className={`block h-[2px] w-4 bg-neutral-800 transition ${
                open ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-4 bg-neutral-800 transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-4 bg-neutral-800 transition ${
                open ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div
          className="
            md:hidden
            bg-white/80 backdrop-blur-xl
            border-t border-neutral-200
          "
        >
          <div className="px-5 py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  text-sm font-medium
                  text-neutral-700
                  hover:text-neutral-900
                  transition
                "
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <HeaderButton variant="secondary" to="/signin">
                Sign In
              </HeaderButton>
              <HeaderButton variant="primary" to="/signup">
                Get Started
              </HeaderButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
