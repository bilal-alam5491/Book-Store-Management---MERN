import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import {
  FaInfoCircle,
  FaEdit,
  FaTimesCircle,
  FaPlus,
  FaEye,
} from "react-icons/fa";
import BookModal from "../modals/BookModal";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setLoader(true);
    axios
      .get("http://localhost:2000/books/get/")
      .then((res) => {
        setBooks(res.data.books);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });

    // console.log(books);
  }, []);

  const handleShowModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };
  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">Book Management</h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/books/create/"
          className="px-4 py-2  mr-10 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          <FaPlus />
        </Link>
      </div>

      <br />
      {loader ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b">ID</th>
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Author</th>
                <th className="px-4 py-2 text-left border-b">Publish Year</th>
                <th className="px-4 py-2 text-left border-b">Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr key={book._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{book._id}</td>
                    <td className="px-4 py-2 border-b">{book.title}</td>
                    <td className="px-4 py-2 border-b">{book.author}</td>
                    <td className="px-4 py-2 border-b">{book.publishYear}</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex justify-evenly items-center">
                        <FaEye
                          className="hover:text-red-300 text-2xl"
                          onClick={() => {
                            handleShowModal(book);
                          }}
                        />
                        <Link to={`/books/details/${book._id}`}>
                          <FaInfoCircle className="hover:text-red-300 text-2xl" />
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                          <FaEdit className="hover:text-red-300 text-2xl" />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                          <FaTimesCircle className="hover:text-red-300 text-2xl" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showModal && selectedBook && (
        <BookModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Home;
