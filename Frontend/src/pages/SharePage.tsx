import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SharePage = () => {
  const { shareId } = useParams();
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/share/${shareId}`);
        if (!res.ok) throw new Error("Failed to load content");
        const data = await res.json();
        setContent(data.content);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchContent();
  }, [shareId]);

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!content) return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Shared Content</h1>
      <pre className="bg-gray-800 text-white p-4 rounded-lg text-left">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
};

export default SharePage;
