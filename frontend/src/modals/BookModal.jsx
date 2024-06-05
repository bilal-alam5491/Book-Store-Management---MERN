import React from "react";
import { FaRegWindowClose } from "react-icons/fa";


const BookModal = ({ book, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
    >
      <div
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-8 flex flex-col relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaRegWindowClose className="hover:text-red-300 text-2xl" />

        </button>
        <h2 className="text-xl font-bold mb-4">Book Details</h2>
        <div className="mb-2">
          <h3 className="text-lg font-semibold">Title:</h3>
          <p className="text-gray-700">{book.title}</p>
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold">Author:</h3>
          <p className="text-gray-700">{book.author}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Publish Year:</h3>
          <p className="text-gray-700">{book.publishYear}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
