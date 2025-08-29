import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const SharePage = () => {
  const { shareId } = useParams();
  const [contents, setContents] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/share/${shareId}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to load content");
        }
        const data = await res.json();
        console.log("Shared data:", data);
        setContents(data.contents || []);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchContent();
  }, [shareId]);

  if (error)
    return (
      <div className="p-6 text-center text-red-600 text-lg font-semibold">
        {error}
      </div>
    );

  if (!contents.length)
    return (
      <div className="p-6 text-center text-xl font-medium animate-pulse">
        Loading…
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center flex justify-center text-gray-900 tracking-tight">
        Shared Brain
      </h1>

      {/* Same responsive grid as Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((item) => (
          <div
            key={item._id}
            className="w-full max-w-sm mx-auto transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Card
              Title={item.title}
              heading={item.title}
              points={item.description || []}
              hashtags={item.tags}
              link={item.link}
              date={new Date(item.createdAt).toLocaleDateString()}
              righticon1={<span>🔗</span>}
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-500">
        <span className="bg-clip-text text-gray-900 font-semibold">
          Made with BrainBin
        </span>
      </div>
    </div>
  );
};

export default SharePage;
