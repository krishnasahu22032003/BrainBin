// ContentModal.jsx
import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ContentModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-[90%] max-w-md p-6 bg-white rounded-xl shadow-lg space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">Add Content</h2>

        {/* Input Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Heading</label>
            <input
              type="text"
              placeholder="Enter heading"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              placeholder="Write something..."
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        {/* Submit Button (Optional) */}
        <div className="pt-2">
          <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
