import React, { useState } from "react";
import { Button } from "../components/Button";
import { FaRocket, FaHeart, FaShare } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import Sidebar from "../components/Sidebar";

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
  const [cards, setCards] = useState<CardData[]>([
    // You can start with empty array or some default cards here
  ]);

  // Handle new content submission from modal
  const handleAddContent = (data: {
    type: string;
    link: string;
    title: string;
    tags: string[];
    description: string[];
  }) => {
    // Create new card data
    const newCard: CardData = {
      Title: data.type.charAt(0).toUpperCase() + data.type.slice(1), // e.g. "Youtube"
      righticon1: <FaHeart />,
      righticon2: <FaShare />,
      heading: data.title,
      points: data.description,
      hashtags: data.tags,
      date: new Date().toLocaleDateString(),
      link: data.link,
    };

    // Add to cards list
    setCards((prev) => [newCard, ...prev]);
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
