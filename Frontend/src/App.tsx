import { useState } from "react";
import { Button } from "./components/Button";
import { FaRocket, FaHeart, FaShare,FaBell, FaUser } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import Card from "./components/Card";
import ContentModal from "./components/ContentModal"; // Adjust the path as needed

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-6">
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

        <div className="flex gap-4 mt-6 flex-wrap">
                <Card
        Title="Facebook Post Example"
        righticon1={<FaHeart />}
        righticon2={<FaShare />}
        heading="Check this Facebook Post"
        points={[
          "Facebook embed test",
          "If you see the post below, embeds work",
        ]}
        hashtags={["#Facebook", "#Embed"]}

        link="https://www.facebook.com/20531316728/posts/10154009990506729/"
      />
      <Card
        Title="YouTube Test"
        righticon1={<FaBell />}
        righticon2={<FaUser />}
        heading="React Tutorial"
        points={["Learn hooks", "Understand state", "Master props"]}
        hashtags={["react", "tutorial"]}
        date="Aug 12, 2025"
        link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />

 <Card
  Title="Twitter Post"
  righticon1={<FaHeart />}
  righticon2={<FaShare />}
  heading="Check out this cool tweet"
  points={["React tips", "Tailwind tricks", "GSAP animations"]}
  hashtags={["#React", "#WebDev"]}
  date="12 Aug 2025"
  link="https://x.com/MehulFanawala/status/1955260144268324977" 
/>
 <Card
        Title="My Twitter Post"
        righticon1={<FaHeart />}
        righticon2={<FaShare />}
        heading="Check out this post"
        points={["React", "TypeScript", "Tailwind"]}
        hashtags={["WebDev", "React"]}
        link="https://twitter.com/jack/status/20"
      />

      {/* Instagram post */}
      <Card
        Title="Instagram Post"
        righticon1={<FaHeart />}
        righticon2={<FaShare />}
        heading="My latest design shot"
        points={["Figma", "UI/UX", "Modern design"]}
        hashtags={["#Design", "#UIUX"]}
        date="12 Aug 2025"
        link="https://www.instagram.com/p/Cabc123xyz/"
      />

      {/* Generic Link */}
      <Card
        Title="Generic Link Test"
        righticon1={<FaBell />}
        righticon2={<FaUser />}
        heading="Visit OpenAI"
        points={["AI research", "ChatGPT"]}
        hashtags={["openai", "ai"]}
        date="Aug 12, 2025"
        link="https://openai.com"
      />

         
        </div>
      </div>

      {/* Modal Component */}
      <ContentModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;
