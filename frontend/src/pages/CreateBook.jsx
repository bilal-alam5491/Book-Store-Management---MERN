import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const [loader, setLoader] = useState(false);

  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const dataToAdd = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    // console.log(dataToAdd)

    setLoader(true);

    axios
      .post("http://localhost:2000/books/add", dataToAdd)
      .then(() => {
        setLoader(false);
        navigator("/");
      })
      .catch((err) => {
        alert("An Error occurred.");
        console.log(err.message);
        setLoader(false);
      });
  }
  return (
    <>
      <BackButton />
      {loader ? (
        <Spinner />
      ) : (
        <form  
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
        >
          <h1 className="text-center text-3xl font-bold mb-6">Add a Book</h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Author Name:
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publishYear"
              className="block text-gray-700 font-bold mb-2"
            >
              Publishing Year:
            </label>
            <input
              type="text"
              name="publishYear"
              id="publishYear"
              value={publishYear}
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateBook;
