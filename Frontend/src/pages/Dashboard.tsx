import React, { useState } from "react";
import { Button } from "../components/Button";
import { FaRocket, FaHeart, FaShare ,FaSignOutAlt } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import Sidebar from "../components/Sidebar";
import { useLogout } from "../hooks/useLogout"; // 👈 import
interface CardData {
  Title: string;
  righticon1: React.ReactElement;
  righticon2: React.ReactElement;
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
        // description if you also save it in DB
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    // Use DB response to update UI
    const newCard: CardData = {
      Title: result.content.type,
      righticon1: <FaHeart />,
      righticon2: <FaShare />,
      heading: result.content.title,
      points: data.description, // only if you’re not saving desc in DB
      hashtags: result.content.tags,
      date: new Date(result.content.createdAt).toLocaleDateString(),
      link: result.content.link,
    };

    setCards((prev) => [newCard, ...prev]);
  } catch (err: any) {
    alert(err.message || "Failed to add content");
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

          {cards.map((card, idx) => (
            <Card
              key={idx}
              Title={card.Title}
              righticon1={card.righticon1}
              righticon2={card.righticon2}
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
