import { FaTwitter, FaLink, FaFileAlt, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

interface SidebarProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filterType, setFilterType }) => {
  const links = [
    { name: "Tweets", type: "tweet", icon: <FaTwitter /> },
    { name: "Links", type: "link", icon: <FaLink /> },
    { name: "Document", type: "document", icon: <FaFileAlt /> },
    { name: "YouTube", type: "youtube", icon: <FaYoutube /> },
    { name: "Instagram", type: "instagram", icon: <FaInstagram /> },
    { name: "Facebook", type: "facebook", icon: <FaFacebook /> },
  ];

  return (
  <aside className="fixed top-0 left-0 h-full w-48 bg-white text-gray-800 flex flex-col p-4 shadow-md">
    {/* Logo + Title */}
<div className="flex items-center justify-center ">
  <img
    src="/image/logo.png"
    alt="Brain Bin Logo"
    className="w-16 h-16 object-contain"
  />
  <h1 className="text-xl font-bold tracking-wide text-gray-800">
    Brain Bin
  </h1>
</div>



    {/* Navigation */}
    <nav className="flex flex-col gap-3 mt-4">
      {links.map((link) => (
        <button
          key={link.name}
          onClick={() => setFilterType(link.type)}
          className={`
            flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200
            ${filterType === link.type ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}
          `}
        >
          <span className="text-lg">{link.icon}</span>
          <span className="font-medium">{link.name}</span>
        </button>
      ))}

      <button
        onClick={() => setFilterType("all")}
        className={`
          mt-3 px-3 py-2 rounded transition-colors duration-200
          ${filterType === "all" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}
        `}
      >
        Show All
      </button>
    </nav>

    {/* Footer */}
    <div className="mt-auto text-center text-sm text-gray-400 italic">
      Your brain’s safe space
    </div>
  </aside>
  );
};

export default Sidebar;
