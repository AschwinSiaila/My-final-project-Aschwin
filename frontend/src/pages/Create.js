import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/url";
import recipes from "../reducers/recipes";
import { Dropdown } from "../components/Dropdown";
import LevelArray from "../components/Level";
// import Upload from "../components/lib/Upload";

const Create = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newIngredienst, setNewIngredients] = useState([]);
  const [newCuisine, setNewCuisine] = useState("");
  const [newDishtype, setNewDishtype] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newCreator, setNewCreator] = useState("");
  const fileInput = useRef();

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
        if (data.success) {
          dispatch(recipes.actions.setItems(data.response));
          dispatch(recipes.actions.setError(null));
        } else {
          dispatch(recipes.actions.setItems([]));
          dispatch(recipes.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        level: newLevel,
        ingredients: newIngredienst,
        cuisine: newCuisine,
        dishtype: newDishtype,
        image: newImage,
        duration: newDuration,
        creator: newCreator,
      }),
    };
    fetch(API_URL("recipes"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(recipes.actions.setNewItems(data.response));
          dispatch(recipes.actions.setError(null));
        } else {
          dispatch(recipes.actions.setNewItems(data.response));
          dispatch(recipes.actions.setError(data.response));
        }
      });
  };

  return (
    <>
      <div className="col typography">
        <h1 className="title">Welcome and create your recipe</h1>
        <div>
          <p className="info">Fill in the recipe form </p>
        </div>
        <button className="btn">explore now</button>
      </div>
      <form className="recipeForm" onSubmit={onFormSubmit}>
        <label>Type your title</label>
        <input id="newTitle" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <label>Type your description</label>
        <input id="newDescription" type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <label>Type your level</label>
        <Dropdown id="newLevel" type="text" value={newLevel} optionsArray={LevelArray} onChange={(e) => setNewLevel(e.target.value)} />
        {/* <input id="newLevel" type="text" value={newLevel} onChange={(e) => setNewLevel(e.target.value)} /> */}
        <label>Type your ingredients</label>
        <input id="newIngredients" type="text" value={newIngredienst} onChange={(e) => setNewIngredients(e.target.value)} />
        <label>Type your cuisine</label>
        <input id="newCuisine" type="text" value={newCuisine} onChange={(e) => setNewCuisine(e.target.value)} />
        <label>what is the dishtype</label>
        <input id="newDishtype" type="text" value={newDishtype} onChange={(e) => setNewDishtype(e.target.value)} />
        <label>type the duration</label>
        <input id="newDuration" type="text" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
        <label>Type your name</label>
        <input id="newCreator" type="text" value={newCreator} onChange={(e) => setNewCreator(e.target.value)} />
        <label>showImage</label>
        <input id="newImage" type="style" value={newImage} ref={fileInput} onChange={(e) => setNewImage(e.target.value)} />
        <button className="sendButton" type="Submit">
          Send recipe
        </button>
      </form>
      {/* <Upload /> */}
    </>
  );
};

export default Create;
