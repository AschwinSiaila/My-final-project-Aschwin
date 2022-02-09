import { createSlice } from "@reduxjs/toolkit";

const recipes = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setNewItems: (store, action) => {
      store.items = [...store.items, action.payload];
    },
    setDeleteItems: (store, action) => {
      store.items = [...store.items, action.payload];
      // store.items = store.items.filter((item) => item._id !== action.payload);
    },
    setPatchItems: (store, action) => {
      store.items.filter((item) => item._id !== action.payload);
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default recipes;
