import type { ReactElement } from "react";

interface Topbar {
  Title: string;
  lefticon: ReactElement;
  righticon1: ReactElement;
  righticon2: ReactElement;
  heading?: string;
  points?: string[];
  hashtags?: string[];
  date?: string;
}

const Card: React.FC<Topbar> = ({
  Title,
  lefticon,
  righticon1,
  righticon2,
  heading = "Subheading",
  points = [],
  hashtags = [],
  date = "Aug 3, 2025",
}) => {
  const wrapperStyle =
    "border border-gray-500 w-full mt-20 rounded-xl shadow-md overflow-hidden bg-white ";
  const topbarStyle =
    "flex items-center justify-between px-4 py-3 bg-gray-100 ";
  const titleStyle = "text-lg font-semibold text-center flex-1";
  const headingStyle = "text-2xl font-bold px-4 pt-4";
  const listStyle = "list-disc list-inside text-gray-700 px-6 pb-4";
  const bottomBarStyle = "flex justify-between items-center px-4 pb-4 pt-2";

  return (
    <div className={wrapperStyle}>
      {/* Top Bar */}
      <div className={topbarStyle}>
        <div>{lefticon}</div>
        <div className={titleStyle}>{Title}</div>
        <div className="flex gap-2">
          {righticon1}
          {righticon2}
        </div>
      </div>

      {/* Heading */}
      <h2 className={headingStyle}>{heading}</h2>

      {/* Bullet Points */}
      <ul className={listStyle}>
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>

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
        <div className="text-xs text-gray-400">{date}</div>
      </div>
    </div>
  );
};

export default Card;
