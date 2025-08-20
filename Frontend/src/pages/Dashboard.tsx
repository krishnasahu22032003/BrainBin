import React, { useState } from "react";
import { Button } from "../components/Button";
import { FaRocket, FaSignOutAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GrShareOption } from "react-icons/gr";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import Sidebar from "../components/Sidebar";
import { useLogout } from "../hooks/useLogout";

interface CardData {
  _id: string;
  Title: string;
  righticon1: React.ReactElement;
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

  // Handle new content submission from modal
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
        credentials: "include", // 👈 important, sends cookie with userId
        body: JSON.stringify({
          type: data.type,
          link: data.link,
          title: data.title,
          tags: data.tags,
          description: data.description,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // Use DB response to update UI
      const newCard: CardData = {
        _id: result.content._id,
        Title: result.content.type,
        righticon1: <IoMdClose className="text-red-500 hover:text-red-700" />,
        heading: result.content.title,
        points: result.content.description || [], // ✅ safe fallback
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
        const result = await res.json();
        throw new Error(result.message || "Failed to delete content");
      }

      // ✅ Remove from UI
      setCards((prev) => prev.filter((card) => card._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <Sidebar />

      {/* Added ml-48 so content shifts right and does not go under Sidebar */}
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
            onClick={() => logout.mutate()}
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
                  <IoMdClose className="text-red-500 hover:text-red-700 cursor-pointer" />
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
