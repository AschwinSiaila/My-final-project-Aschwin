import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/url";
import recipes from "../reducers/user";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Main = () => {
  // const recipesItems = useSelector((store) => store.recipes.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("recipes"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(recipes.actions.setItems(data.response));
          dispatch(recipes.actions.setError(null));
        } else {
          dispatch(recipes.actions.setItems([]));
          dispatch(recipes.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  return (
    <div>
      <div>
        <HeroSection />
      </div>

      <Footer />
    </div>
  );
};
export default Main;
