import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import {
  deleteBook,
  toggleBook,
  selectBooks,
} from "../../redux/slices/booksSlices.js";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
} from "../../redux/slices/filterSlices.js";
import "./BookList.css";

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);
  const dispatch = useDispatch();

  const deleteBookHandler = (bookID) => {
    dispatch(deleteBook(bookID));
  };

  const toggleeBookHandler = (bookID) => {
    dispatch(toggleBook(bookID));
  };

  const filteredBook = books.filter((book) => {
    const mathcesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());

    const mathcesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    const mathcesFavorite = onlyFavoriteFilter ? book.isFavorite : true;

    // if (onlyFavoriteFilter) {
    //   return mathcesFavorite;
    // }

    return mathcesTitle && mathcesAuthor && mathcesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBook.map((book, i) => (
            <li key={i}>
              <div className="book-info">
                {++i}. {highlightMatch(book.title, titleFilter)} by {""}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>(
                {book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => toggleeBookHandler(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => deleteBookHandler(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
