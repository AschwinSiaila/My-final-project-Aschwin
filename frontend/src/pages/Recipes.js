import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { API_URL } from "../utils/url";
import recipes from "../reducers/recipes";
import { Button } from "../components/lib/Button";

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

  const deleteRecipe = (itemId) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL(`recipes/${itemId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(recipes.actions.setDeleteItems(data.response));
          dispatch(recipes.actions.setError(null));
        } else {
          dispatch(recipes.actions.setDeleteItems([]));
          dispatch(recipes.actions.setError(data.response));
        }
      });
  };

  const patchRecipe = (itemId) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL(`recipes/${itemId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(recipes.actions.setPatchItems(data.response));
          dispatch(recipes.actions.setError(null));
        } else {
          dispatch(recipes.actions.setPatchItems([]));
          dispatch(recipes.actions.setError(data.response));
        }
      });
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
    //  {
    //   const updatedRecipe = recipes.map((item) => {
    //     if (item._id === data._id) {
    //       item.loves += 1;
    //       return item;
    //     } else {
    //       return item;
    //     }
    //   });
    //   setRecipe(updatedRecipe);
    // });
  };

  return (
    <>
      <h1>Enjoy the recipes!</h1>
      {/* <form className="recipeForm">
        <input type="text" />
        <button className="sendButton" type="submit">
          Search
        </button>
      </form> */}

      {recipesItems.map((item) => (
        <div key={item._id}>
          <h1> Title: {item.title} </h1>
          <img src={item.image} alt="" />
          <div> description: {item.description} </div>
          <div>level: {item.level}</div>
          <div> ingredients: {item.ingredients}</div>
          <div> cuisine: {item.cuisine}</div>
          <div> dishtype: {item.dishType}</div>
          <div> duration: {item.duration}</div>
          <div> name: {item.creator}</div>
          <div>- Created {moment(item.createdAt).fromNow()}</div>
          <div>- Created at {item.createdAt}</div>

          <button className="loveButton" onClick={() => onLovesIncrease(item._id)}>
            {" "}
            &hearts; {item.loves}
          </button>
          {/* <Button logoutbutton={true} buttonText="Log out" onClickFunction={logOut} /> */}
          <Button buttonText="Delete" onClickFunction={() => deleteRecipe(item._id)} />
          <Button buttonText="Change" onClickFunction={() => patchRecipe(item._id)} />
        </div>
      ))}
    </>
  );
};

export default Recipes;
