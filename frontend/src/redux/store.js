import { configureStore } from "@reduxjs/toolkit";
import booksSlices from "./slices/booksSlices";
import filterSlices from "./slices/filterSlices";
import errorSlices from "./slices/errorSlices";

const store = configureStore({
  reducer: {
    books: booksSlices,
    filter: filterSlices,
    error: errorSlices,
  },
});

export default store;
