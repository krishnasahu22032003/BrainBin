import { useEffect, type ReactElement } from "react";

interface CardProps {
  Title: string;
  righticon1: ReactElement;
  description?: string;
  heading?: string;
  points?: string[];
  hashtags?: string[];
  date?: string; // keep as string for formatted date
  link: string;
}

const Card: React.FC<CardProps> = ({
  Title,
  righticon1,
  heading = "Subheading",
  points = [],
  hashtags = [],
  date,
  link,
}) => {
  // Use today's date if none provided
  const displayDate =
    date ||
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const wrapperStyle =
    "border border-gray-500 w-100 h-full mt-20 rounded-xl shadow-md overflow-hidden bg-white";
  const topbarStyle =
    "flex items-center justify-between px-4 py-3 bg-gray-100";
  const titleStyle = "text-lg font-semibold text-center flex-1 text-gray-800";
  const headingStyle = "text-2xl font-bold px-4 pt-4 text-gray-900";
  const listStyle = "list-disc list-inside text-gray-700 px-6 pb-4";
  const bottomBarStyle = "flex justify-between items-center px-4 pb-4 pt-2";

  // Detect link type
  const isYouTube = /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(link);
  const isTwitter = /(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/status\/\d+/.test(
    link
  );
  const isFacebook = /facebook\.com\/.+/.test(link);
  const isInstagram = /instagram\.com\/p\//.test(link);

  // Normalize Twitter/X link
  const getTwitterUrl = (url: string) => url.replace("x.com", "twitter.com");

  // Extract YouTube ID
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  // Load scripts dynamically
  const loadScript = (src: string, id: string) => {
    return new Promise<void>((resolve) => {
      if (document.getElementById(id)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (isTwitter) {
      loadScript("https://platform.twitter.com/widgets.js", "twitter-wjs").then(
        () => {
          (window as any).twttr?.widgets.load();
        }
      );
    }
    if (isInstagram) {
      loadScript("//www.instagram.com/embed.js", "instagram-wjs").then(() => {
        (window as any).instgrm?.Embeds.process();
      });
    }
  }, [link, isTwitter, isInstagram]);

  return (
    <div className={wrapperStyle}>
      {/* Top Bar */}
      <div className={topbarStyle}>
        <div className={titleStyle}>{Title}</div>
        <div className="flex gap-2">
          {righticon1}
      
        </div>
      </div>

      {/* Heading */}
      <h2 className={headingStyle}>{heading}</h2>

      {/* Bullet Points */}
      {points.length > 0 && (
        <ul className={listStyle}>
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      )}

      {/* Link Rendering */}
      <div className="w-full px-4 pb-4">
        {isYouTube ? (
          <iframe
            className="w-full aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${getYouTubeId(link)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : isTwitter ? (
          <blockquote className="twitter-tweet">
            <a href={getTwitterUrl(link)}></a>
          </blockquote>
        ) : isFacebook ? (
          <iframe
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
              link
            )}&width=500`}
            width="100%"
            height="400"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="encrypted-media"
          ></iframe>
        ) : isInstagram ? (
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={link}
            data-instgrm-version="14"
          ></blockquote>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 underline truncate"
          >
            {link}
          </a>
        )}
      </div>

      {/* Bottom Hashtags and Date */}
      <div className={bottomBarStyle}>
        <div className="flex gap-2 flex-wrap">
          {hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-400">{displayDate}</div>
      </div>
    </div>
  );
};

export default Card;
