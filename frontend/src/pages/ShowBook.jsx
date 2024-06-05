import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const [book, setBook] = useState("");

  const [loader, setLoader] = useState(false);

  const navigator = useNavigate();
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://localhost:2000/books/get/${id}`)
      .then((res) => {
        let data = res.data.books;

        setBook(data);
        console.log(data)
        
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.message);
        alert(err.message);
      });
  }, []);

 
  return (
    <>
    <BackButton/>
      {loader ?  <Spinner /> : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
    <h1 className="text-center text-2xl font-bold mb-6">Book Data Entry Details</h1>

    <div className="mb-4">
      <h2 className="text-lg font-semibold">Book id:</h2>
      <h3 className="text-gray-700">{book._id}</h3>
    </div>

    <div className="mb-4">
      <h2 className="text-lg font-semibold">Book Name:</h2>
      <h3 className="text-gray-700">{book.title}</h3>
    </div>

    <div className="mb-4">
      <h2 className="text-lg font-semibold">Author Name:</h2>
      <h3 className="text-gray-700">{book.author}</h3>
    </div>

    <div className="mb-4">
      <h2 className="text-lg font-semibold">Publish Year:</h2>
      <h3 className="text-gray-700">{book.publishYear}</h3>
    </div>

    <div className="mb-4">
      <h2 className="text-lg font-semibold">Created At:</h2>
      <h3 className="text-gray-700">{book.createdAt}</h3>
    </div>

    <div>
      <h2 className="text-lg font-semibold">Updated At:</h2>
      <h3 className="text-gray-700">{book.updatedAt}</h3>
    </div>
  </div>
</div>

        
      )}
    </>
  );
};

export default ShowBook;
