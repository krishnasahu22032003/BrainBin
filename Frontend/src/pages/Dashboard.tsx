import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { FaRocket, FaSignOutAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GrShareOption } from "react-icons/gr";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import Sidebar from "../components/Sidebar";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

interface CardData {
  _id: string;
  Title: string;
  heading: string;
  points: string[];
  hashtags: string[];
  date?: string;
  link: string;
}

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const logout = useLogout();
  const navigate = useNavigate();

  // Fetch cards from backend on mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/content", {
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

    fetchCards();
  }, []);

  const handleAddContent = async (data: {
    type: string;
    link: string;
    title: string;
    tags: string[];
    description: string[];
  }) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/content", {
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
      const res = await fetch(`http://localhost:3000/api/v1/content/${id}`, {
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

  // ✅ Proper logout with redirect
  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate("/signin"),
      onError: (err: any) => alert(err.message || "Logout failed"),
    });
  };

  return (
    <>
      <Sidebar />

      <div className="ml-48 p-6">
        <div className="flex justify-end gap-4 mb-6">
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
            onClick={() => console.log("clicked")}
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

        <div className="flex gap-4 flex-wrap justify-start">
          {cards.length === 0 && (
            <p className="text-gray-500">No cards yet. Add some content!</p>
          )}

          {cards.map((card) => (
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
