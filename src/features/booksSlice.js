import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncBooks = createAsyncThunk("fetch/Books", async () => {
  try {
    const response = await axios.get(
      `https://rx-practice1-backend.vercel.app/books`
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addBookAsync = createAsyncThunk("add/Book", async (bookToAdd) => {
  try {
    const response = await axios.post(
      "https://rx-practice1-backend.vercel.app/books",
      bookToAdd
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateBookAsync = createAsyncThunk(
  "update/Book",
  async (bookToUpdate) => {
    try {
      const response = await axios.post(
        `https://rx-practice1-backend.vercel.app/books/${bookToUpdate._id}`,
        bookToUpdate
      );

      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteBookAsync = createAsyncThunk(
  "delete/Async",
  async (bookId) => {
    try {
      const response = await axios.delete(
        `https://rx-practice1-backend.vercel.app/books/${bookId}`
      );

      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAsyncBooks.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchAsyncBooks.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
    });

    builder.addCase(fetchAsyncBooks.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addBookAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addBookAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
    });

    builder.addCase(addBookAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateBookAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateBookAsync.fulfilled, (state, action) => {
      state.status = "success";
      const existingBookIndex = state.books.books.findIndex(
        (book) => book._id === action.payload._id
      );
      state.books.books[existingBookIndex] = action.payload;
    });

    builder.addCase(updateBookAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteBookAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteBookAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.books.books = state.books.books.filter(
        (book) => book._id !== action.payload.book._id
      );
    });

    builder.addCase(deleteBookAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default booksSlice.reducer;
