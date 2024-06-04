import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  fetchBook,
  selectisLoadingViaAPI,
} from "../../redux/slices/booksSlices.js";
import { FaSpinner } from "react-icons/fa";
import BookData from "../../data/books.json";
import createBookWithID from "../../utils/createBookWithID.js";
import { setError } from "../../redux/slices/errorSlices.js";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const isLoadingViaAPI = useSelector(selectisLoadingViaAPI);

  function handlerAddRandomBook() {
    const randomIndex = Math.floor(Math.random() * BookData.length);
    const randomBook = BookData[randomIndex];
    const ranndomBookWithID = createBookWithID(randomBook, "random");

    dispatch(addBook(ranndomBookWithID));
  }

  function handlerSubmit(e) {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithID({ title, author }, "manual");
      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author"));
    }
  }

  function handlerRandomBookViaAPI() {
    dispatch(fetchBook("http://localhost:4000/random-book"));
  }

  return (
    <div className="app-block book-form">
      <h2>Add a new Book</h2>
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handlerAddRandomBook}>
          Add Random
        </button>
        <button
          type="button"
          onClick={handlerRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
