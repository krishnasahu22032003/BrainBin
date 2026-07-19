import { useState, useEffect, useRef } from "react";
import { Button } from "../components/Button";
import { FaRocket, FaSignOutAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GrShareOption } from "react-icons/gr";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import Sidebar from "../components/Sidebar";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import ENV_SECRETS from "../lib/SECRETS";

interface CardData {
  _id: string;
  Title: string;
  heading: string;
  points: string[];
  hashtags: string[];
  date?: string;
  link: string;
}

interface UserData {
  _id: string;
  email: string;
}

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [user, setUser] = useState<UserData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const API = ENV_SECRETS.VITE_API_URL
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${API}/api/v1/content`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch content");

        const cardsFromDB = data.content.map((c: any) => ({
          _id: c._id,
          Title: c.type,
          heading: c.title,
          points: c.description || [],
          hashtags: c.tags || [],
          date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "",
          link: c.link,
        }));

        setCards(cardsFromDB);
      } catch (err: any) {
        console.error("Error fetching content:", err.message);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/v1/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        }
      } catch (err: any) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchCards();
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddContent = async (data: {
    type: string;
    link: string;
    title: string;
    tags: string[];
    description: string[];
  }) => {
    try {
      const res = await fetch(`${API}/api/v1/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to add content");

      const newCard: CardData = {
        _id: result.content._id,
        Title: result.content.type,
        heading: result.content.title,
        points: result.content.description || [],
        hashtags: result.content.tags || [],
        date: result.content.createdAt
          ? new Date(result.content.createdAt).toLocaleDateString()
          : "",
        link: result.content.link,
      };

      setCards((prev) => [newCard, ...prev]);
    } catch (err: any) {
      alert(err.message || "Failed to add content");
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/v1/content/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete content");
      }

      setCards((prev) => prev.filter((card) => card._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete content");
    }
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate("/signin"),
      onError: (err: any) => alert(err.message || "Logout failed"),
    });
  };

  const handleNativeShare = async () => {
    try {
      const res = await fetch(`${API}/api/v1/share`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to share");

      const shareUrl = `${window.location.origin}/share/${data.shareId}`;

      if (navigator.share) {
        await navigator.share({
          title: "Check this out on BrainBin",
          text: "I saved something interesting!",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  const filteredCards =
    filterType === "all"
      ? cards
      : cards.filter((c) => c.Title.toLowerCase() === filterType.toLowerCase());

  const avatarLetter = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <>
      <Sidebar filterType={filterType} setFilterType={setFilterType} />

      <div className="p-4 md:ml-48">
        <div className="hidden md:flex flex-wrap justify-end gap-2">
          <Button
            variant="primary"
            size="lg"
            text="Add content"
            onClick={() => setIsModalOpen(true)}
            icon={<FaRocket />}
          />
          <Button
            variant="secondary"
            size="lg"
            text="Share"
            onClick={handleNativeShare}
            icon={<GrShareOption />}
          />
          <Button
            variant="secondary"
            size="lg"
            text={logout.isPending ? "Logging out..." : "Logout"}
            onClick={handleLogout}
            icon={<FaSignOutAlt />}
          />
        </div>

        <div className="flex md:hidden justify-end">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold text-base flex items-center justify-center shadow-md ring-2 ring-white active:scale-95 transition-transform duration-150"
            >
              {avatarLetter}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {user?.email && (
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user.email}
                    </p>
                  </div>
                )}

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <FaRocket className="text-violet-600 text-sm" />
                    <span>Add content</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNativeShare();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <GrShareOption className="text-gray-500 text-sm" />
                    <span>Share</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    disabled={logout.isPending}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors disabled:opacity-60"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>{logout.isPending ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredCards.length === 0 && (
            <p className="text-gray-500">No cards yet. Add some content!</p>
          )}

          {filteredCards.map((card) => (
            <Card
              key={card._id}
              Title={card.Title}
              righticon1={
                <button onClick={() => handleDeleteContent(card._id)}>
                  <IoMdClose className="cursor-pointer" />
                </button>
              }
              heading={card.heading}
              points={card.points}
              hashtags={card.hashtags}
              date={card.date}
              link={card.link}
            />
          ))}
        </div>
      </div>

      <ContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddContent}
      />
    </>
  );
}

export default Dashboard;