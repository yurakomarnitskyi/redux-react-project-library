import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  onlyFavorite: false,
};

const filterSlices = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
      // return { ...state, title: action.payload };
    },

    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },

    resetTitleFilter: () => {
      return initialState;
    },

    setfilterOnlyFavorite: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
    },
  },
});

export const {
  setTitleFilter,
  setAuthorFilter,
  resetTitleFilter,
  setfilterOnlyFavorite,
} = filterSlices.actions;

export const selectTitleFilter = (state) => state.filter.title;

export const selectAuthorFilter = (state) => state.filter.author;

export const selectOnlyFavorite = (state) => state.filter.onlyFavorite;

export default filterSlices.reducer;
