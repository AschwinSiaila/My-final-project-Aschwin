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
    setUpdateItem: (store, action) => {
      const updateItem = store.items.map((item) => {
        if (item._id === action.payload._id) {
          item = action.payload;
          return item;
        } else {
          return item;
        }
      })
      store.items = updateItem
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default recipes;
