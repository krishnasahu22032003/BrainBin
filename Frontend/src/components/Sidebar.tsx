import { useState } from "react";
import {
  FaTwitter,
  FaLink,
  FaFileAlt,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

interface SidebarProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filterType, setFilterType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Tweets", type: "tweet", icon: <FaTwitter /> },
    { name: "Links", type: "link", icon: <FaLink /> },
    { name: "Document", type: "document", icon: <FaFileAlt /> },
    { name: "YouTube", type: "youtube", icon: <FaYoutube /> },
    { name: "Instagram", type: "instagram", icon: <FaInstagram /> },
    { name: "Facebook", type: "facebook", icon: <FaFacebook /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button (Top-Right) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-800 focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-48 bg-white text-gray-800 flex flex-col p-4 shadow-md
          transition-transform duration-300
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:block
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img
            src="/image/logo.png"
            alt="Brain Bin Logo"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-xl font-bold tracking-wide text-gray-800">
            Brain Bin
          </h1>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-3 mt-4">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                setFilterType(link.type);
                setIsOpen(false); // close sidebar on mobile
              }}
              className={`
                flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200
                ${
                  filterType === link.type
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }
              `}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </button>
          ))}

          <button
            onClick={() => {
              setFilterType("all");
              setIsOpen(false); // close sidebar on mobile
            }}
            className={`
              mt-3 px-3 py-2 rounded transition-colors duration-200
              ${
                filterType === "all"
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }
            `}
          >
            Show All
          </button>
        </nav>

        {/* Footer */}
        <div className="mt-55 text-center text-sm text-gray-400 italic">
          Your brain’s safe space
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
