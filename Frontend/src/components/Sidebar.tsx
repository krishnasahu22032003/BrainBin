import React from "react";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-48 bg-gray-100 text-black flex flex-col p-4 shadow-lg">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-center">Brain Bin</h1>

      {/* Links */}
      <nav className="flex flex-col gap-4">
        <a
          href="#tweets"
          className="hover:bg-gray-700 rounded px-3 py-2 transition"
        >
          Tweets
        </a>
        <a
          href="#links"
          className="hover:bg-gray-700 rounded px-3 py-2 transition"
        >
          Links
        </a>
        <a
          href="#document"
          className="hover:bg-gray-700 rounded px-3 py-2 transition"
        >
          Document
        </a>
        <a
          href="#youtube"
          className="hover:bg-gray-700 rounded px-3 py-2 transition"
        >
          YouTube
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
