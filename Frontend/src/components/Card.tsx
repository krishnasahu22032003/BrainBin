import { useEffect, type ReactElement } from "react";

interface CardProps {
  Title: string;
  righticon1: ReactElement;
  description?: string;
  heading?: string;
  points?: string[];
  hashtags?: string[];
  date?: string;
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
  const displayDate =
    date ||
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const wrapperStyle =
    "border border-gray-200 w-full h-full rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white flex flex-col";
  const topbarStyle =
    "flex items-center justify-between gap-2 px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-100";
  const titleStyle =
    "text-sm sm:text-base font-semibold text-gray-700 truncate flex-1 text-center";
  const headingStyle =
    "text-lg sm:text-2xl font-bold px-4 sm:px-5 pt-4 sm:pt-5 text-gray-900 break-words leading-snug";
  const listStyle =
    "list-disc list-inside text-sm sm:text-base text-gray-600 px-5 sm:px-6 pt-2 pb-1 space-y-1";
  const bottomBarStyle =
    "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-5 pt-3 pb-4 sm:pb-5 mt-auto border-t border-gray-100";

  const isYouTube = /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(link);
  const isTwitter = /(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/status\/\d+/.test(
    link
  );
  const isFacebook = /facebook\.com\/.+/.test(link);
  const isInstagram = /instagram\.com\/p\//.test(link);

  const getTwitterUrl = (url: string) => url.replace("x.com", "twitter.com");

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

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
      <div className={topbarStyle}>
        <div className={titleStyle}>{Title}</div>
        <div className="flex gap-2 shrink-0">{righticon1}</div>
      </div>

      <h2 className={headingStyle}>{heading}</h2>

      {points.length > 0 && (
        <ul className={listStyle}>
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      )}

      <div className="w-full px-4 sm:px-5 pt-3 pb-1">
        {isYouTube ? (
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeId(link)}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : isTwitter ? (
          <div className="w-full overflow-hidden">
            <blockquote className="twitter-tweet">
              <a href={getTwitterUrl(link)}></a>
            </blockquote>
          </div>
        ) : isFacebook ? (
          <div className="w-full aspect-[4/5] sm:aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
                link
              )}&width=500`}
              className="w-full h-full"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="encrypted-media"
            ></iframe>
          </div>
        ) : isInstagram ? (
          <div className="w-full overflow-hidden">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={link}
              data-instgrm-version="14"
            ></blockquote>
          </div>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm sm:text-base text-blue-600 underline truncate"
          >
            {link}
          </a>
        )}
      </div>

      <div className={bottomBarStyle}>
        <div className="flex gap-1.5 flex-wrap">
          {hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-400 whitespace-nowrap">
          {displayDate}
        </div>
      </div>
    </div>
  );
};

export default Card;