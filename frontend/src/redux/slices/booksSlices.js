import createBookWithID from "../../utils/createBookWithID";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./errorSlices";

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
      // throw error;
    }
  }
);

const booksSlices = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },

    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },

    toggleBook: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  // Option 1
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },

    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, "API"));
      }
    },

    [fetchBook.rejected]: (state) => {
      state.payload = false;
    },
  },

  //Option 2
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.pending, (state) => {
  //     state.isLoadingViaAPI = true;
  //   });
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.books.push(createBookWithID(action.payload, "API"));
  //     }
  //   });
  //   builder.addCase(fetchBook.rejected, (state) => {
  //     state.isLoadingViaAPI = false;
  //   });
  // },
});

export const { addBook, deleteBook, toggleBook } = booksSlices.actions;

export const selectBooks = (state) => state.books.books;
export const selectisLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlices.reducer;
