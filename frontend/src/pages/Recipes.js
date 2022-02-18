import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { API_URL } from "../utils/url";
import recipes from "../reducers/recipes";
import Footer from "../components/Footer";

const Recipes = () => {
  const recipesItems = useSelector((store) => store.recipes.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    getRecipes();
  });

  const getRecipes = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("recipes"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(recipes.actions.setItems(data.response));
          dispatch(recipes.actions.setError(null));
        } else {
          dispatch(recipes.actions.setItems([]));
          dispatch(recipes.actions.setError(data.response));
        }
      });
  };

  const deleteRecipe = (itemId) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL(`recipes/${itemId}`), options)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const onLovesIncrease = (itemId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(API_URL(`recipes/${itemId}/loves`), options)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1>Enjoy the recipes!</h1>
      <div className="recipes-container">
      {recipesItems.map((item) => (
        <div className="recipeCard">
          <div key={item._id}>
          <img src={item.image} alt="" style={{width: "100%", height: "auto"}} /><br></br>
            <h1> <span>Title:</span> {item.title} </h1><br></br><br></br>   
            <div><span>description:</span> {item.description} </div> <br></br>
            <div><span>level:</span> {item.level}</div> <br></br>
            <div><span>ingredients:</span> {item.ingredients}</div>
            <br></br>
            <div><span>cuisine:</span> {item.cuisine}</div>
            <br></br>
            <div><span>dishtype:</span> {item.dishtype}</div>
            <br></br>
            <div><span>duration:</span> {item.duration} minutes</div>
            <br></br>
            <div><span>name:</span> {item.creator}</div>
            <br></br>
            <div><span>- Created</span> {moment(item.createdAt).fromNow()}</div>
            <div><span>- Created at</span> {item.createdAt}</div>
            <br></br>
            <button className="loveButton" onClick={() => onLovesIncrease(item._id)}>
              {" "}
              &hearts; {item.loves}
            </button>
            <br></br>
            <button className="sendButton"  onClick={() => deleteRecipe(item._id)}>Delete</button>
          </div>
        </div>
      ))}
      </div>
      <Footer />
    </>
  );
};

export default Recipes;
