import { useState } from "react";
import { Button } from "./components/Button";
import { FaRocket, FaBars, FaBell, FaUser } from "react-icons/fa";
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
            Title="Dashboard"
            righticon1={<FaBell />}
            righticon2={<FaUser />}
            heading="Today's Summary"
            points={[
              "You have 5 new notifications.",
              "Server CPU usage is at 65%.",
              "Backup completed successfully.",
            ]}
            hashtags={["system", "notifications"]}
            date="Aug 3, 2025"
          />
          <Card
            Title="Dashboard"
            righticon1={<FaBell />}
            righticon2={<FaUser />}
            heading="Today's Summary"
            points={[
              "You have 5 new notifications.",
              "Server CPU usage is at 65%.",
              "Backup completed successfully.",
            ]}
            hashtags={["system", "notifications"]}
            date="Aug 3, 2025"
          />
        </div>
      </div>

      {/* Modal Component */}
      <ContentModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;
