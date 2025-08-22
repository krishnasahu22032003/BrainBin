import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    type: string;
    link: string;
    title: string;
    tags: string[];
    description: string[];
  }) => void; // made required
}

const contentTypes = [
  "document",
  "tweet",
  "youtube",
  "link",
  "instagram",
  "facebook",
];

const ContentModal: React.FC<ContentModalProps> = ({ open, onClose, onSubmit }) => {
  const [type, setType] = useState(contentTypes[0]);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const descriptionBullets = descriptionText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    onSubmit({
      type,
      link,
      title,
      tags,
      description: descriptionBullets,
    });

    // reset
    setType(contentTypes[0]);
    setLink("");
    setTitle("");
    setTags([]);
    setTagInput("");
    setDescriptionText("");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="relative w-[90%] max-w-md p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-4 transition-all"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white text-2xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Add Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
    
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {contentTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Link
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Hashtags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Press Enter to add tag"
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description (one bullet per line)
            </label>
            <textarea
              rows={4}
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              placeholder="First point\nSecond point\nThird point"
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            ></textarea>
          </div>

  
          <div className="pt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentModal;
