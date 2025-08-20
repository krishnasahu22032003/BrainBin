import React from "react";
import { FaTwitter, FaLink, FaFileAlt, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Sidebar = () => {
  const links = [
    { name: "Tweets", href: "#tweets", icon: <FaTwitter /> },
    { name: "Links", href: "#links", icon: <FaLink /> },
    { name: "Document", href: "#document", icon: <FaFileAlt /> },
    { name: "YouTube", href: "#youtube", icon: <FaYoutube /> },
    { name: "Instagram", href: "#instagram", icon: <FaInstagram /> },
    { name: "Facebook", href: "#facebook", icon: <FaFacebook /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-48 bg-white text-gray-800 flex flex-col p-4 shadow-md">
      {/* Logo / Heading */}
      <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">
        Brain Bin
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 mt-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="
              flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 
              transition-colors duration-200 cursor-pointer
            "
          >
            <span className="text-lg">{link.icon}</span>
            <span className="font-medium">{link.name}</span>
          </a>
        ))}
      </nav>

      {/* Optional footer / info */}
      <div className="mt-auto text-center text-sm text-gray-400 italic">
        Your brain’s safe space
      </div>
    </aside>
  );
};

export default Sidebar;
