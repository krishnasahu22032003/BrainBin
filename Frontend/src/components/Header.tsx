import { Link } from "react-router-dom";
import HeaderButton from "./Headerbutton";

const Header = () => {
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
        {/* ---------------- Left: Logo ---------------- */}
        <Link to="/" className="flex items-center gap-2 group">
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

        {/* ---------------- Center: Nav Items ---------------- */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Home", href: "#home" },
            { label: "Features", href: "#features" },
            { label: "About", href: "#about" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Pricing", href: "#pricing" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                relative text-sm font-medium
                text-neutral-600
                transition-colors duration-300
                hover:text-neutral-900
                after:absolute after:-bottom-1 after:left-0
                after:h-[2px] after:w-0
                after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ---------------- Right: CTA Buttons ---------------- */}
        <div className="flex items-center gap-3">
          <HeaderButton variant="secondary" to="/signin">
            Sign In
          </HeaderButton>

          <HeaderButton variant="primary" to="/signup">
            Get Started
          </HeaderButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
