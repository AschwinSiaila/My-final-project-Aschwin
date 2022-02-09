import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import "./App.css";

import "./scss/index.scss";

import Main from "./pages/Main";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Recipes from "./pages/Recipes";
import Settings from "./components/Settings";
// import Footer from "./components/Footer";
import Create from "./pages/Create";

import user from "./reducers/user";
import recipes from "./reducers/recipes";

const reducer = combineReducers({
  user: user.reducer,
  recipes: recipes.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />

          <div className="container main">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/create" element={<Create />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
};
