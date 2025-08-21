import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card"; // adjust path

const SharePage = () => {
  const { shareId } = useParams();
  const [content, setContent] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/share/${shareId}`);
        if (!res.ok) throw new Error("Failed to load content");
        const data = await res.json();

        // Backend now returns { contents: [...] }
        setContent(Array.isArray(data.contents) ? data.contents : []);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchContent();
  }, [shareId]);

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!content.length) return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Shared Content</h1>
      {content.map((item) => (
        <Card
          key={item._id}
          Title={item.Title}
          heading={item.heading}
          description={item.description} // if your model has this
          points={item.points}
          hashtags={item.hashtags}
          date={item.date}
          link={item.link}
          righticon1={<span>🔗</span>}
        />
      ))}
    </div>
  );
};

export default SharePage;
