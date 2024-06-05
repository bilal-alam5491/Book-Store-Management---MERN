const express = require("express");
const bookModel = require("../models/bookModel.js");

const router = express.Router();


// getAll
router.get("/get/", async (req, res) => {
  try {
    const allBooks = await bookModel.find({});
    res.status(201).json({ count: allBooks.length, books: allBooks });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// getbyID
router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookByID = await bookModel.findById(id);
    res.status(201).json({ books: bookByID });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// add
router.post("/add", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: "Send All Fields Please" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await bookModel.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: "Send All Fields Please" });
    }

    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await bookModel.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await bookModel.findByIdAndDelete(id);

    res.status(201).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


module.exports = router