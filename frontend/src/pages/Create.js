import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/url";
import recipes from "../reducers/recipes";

const Create = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newIngredienst, setNewIngredients] = useState([]);
  const [newCuisine, setNewCuisine] = useState("");
  const [newDishtype, setNewDishtype] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newCreator, setNewCreator] = useState("");
  const [newImage, setNewImage]= useState("")
  const [isPending, setIsPending] = useState(false);

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
        duration: newDuration,
        creator: newCreator,
        image: newImage,
      }),
    };
    fetch(API_URL("recipes"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(recipes.actions.setNewItems(data.response));
          dispatch(recipes.actions.setError(null));
          navigate("/recipes");
          setIsPending(false);
        } else {
          dispatch(recipes.actions.setNewItems(data.response));
          dispatch(recipes.actions.setError(data.response));
          setIsPending(true);
        }
      });
  };


  return (
    <>
      <div className="col typography">
        <h1 className="title">Welcome and create your recipe</h1>
        <div>
          <br></br>
          <p className="info">Fill in the recipe form and go to recipes</p>
          <br></br>
          <br></br>
        </div>
        <Link to={"/recipes"}>
          <button className="btn">go to recipes </button>
        </Link>
        <div className="recipeCard">
            <h1> <span>Title:</span> {newTitle} </h1><br></br><br></br>
            <div>{newImage}</div><br></br>
            <div> <span>description:</span> {newDescription} </div> <br></br>
            <div><span> level:</span> {newLevel}</div> <br></br>
            <div><span> ingredients:</span>  {newIngredienst}</div>
            <br></br>
            <div><span>cuisine:</span> {newCuisine}</div>
            <br></br>
            <div> <span>dishtype:</span> {newDishtype}</div>
            <br></br>
            <div><span>duration:</span> {newDuration} minutes</div>
            <br></br>
            <div><span>name:</span> {newCreator}</div>
        </div>
      </div>
      <form className="recipeForm" onSubmit={onFormSubmit}>
      <input id="setImage" placeholder="Fill in this form and create a recipe" disabled type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
        <label>Type your title</label>
        <input id="newTitle" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <label>Type your description</label>
        <input id="newDescription" type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <label>Choose your level</label>

        <input id="newLevel" type="onFormSubmit" defaultValue={newLevel} />
        <select value={newLevel} onChange={(e) => setNewLevel(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Amateur Chef">Amateur Chef</option>
          <option value="Pro Chef">Pro Chef</option>
        </select>
        <label>Type your ingredient </label>
        <input id="newIngredients" type="text" value={newIngredienst} onChange={(e) => setNewIngredients(e.target.value)} />
        <label>Type your cuisine</label>
        <input id="newCuisine" type="text" value={newCuisine} onChange={(e) => setNewCuisine(e.target.value)} />
        <label>Choose your dishtype</label>
        <input id="newDishtype" type="onFormsubmit" defaultValue={newDishtype} />
        <select value={newDishtype} onChange={(e) => setNewDishtype(e.target.value)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Main_course">Main_course</option>
          <option value="Soup">Soup</option>
          <option value="Snack">Snack</option>
          <option value="Drink">Drink</option>
          <option value="Desert">Desert</option>
          <option value="Other">Other</option>
        </select>
        
        <label>type the duration</label>
        <input id="newDuration" type="text" value={newDuration} placeholder="Fill in only number of minutes...." onChange={(e) => setNewDuration(e.target.value)} />
        <label>Type your name</label>
        <input id="newCreator" type="text" value={newCreator} onChange={(e) => setNewCreator(e.target.value)} />

        {!isPending && (
          <button className="sendButton" type="Submit">
            Send recipe
          </button>
        )}
        {isPending && (
          <button className="sendButton" type="Submit">
            Fill in everything....
          </button>
        )}
     
      </form>
    
    </>
  );
};

export default Create;
