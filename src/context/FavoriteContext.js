import React, { useReducer, createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext();

const initialState = {
  favorites: [
    {
      id: 0,
      agency: "",
      agencyLogo: "",
      price: 0,
      displayPrice: "",
      address: "",
      photos: "",
      description: "",
      propertyId: "",
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      localStorage.setItem("favorites", JSON.stringify([...state.favorites, action.payload]));

      return {
        favorites: JSON.parse(localStorage.getItem("favorites")),
      };
    case "REMOVE_ITEM":
      const temp = [...state.favorites];

      const filtered = temp.filter((el) => el.propertyId != action.payload.propertyId);

      localStorage.setItem("favorites", JSON.stringify([...filtered]));

      return {
        favorites: JSON.parse(localStorage.getItem("favorites")),
      };
    default:
      return {
        state,
      };
  }
};

const initializer = (initialValue = initialState) => {
  const favoriteData = JSON.parse(localStorage.getItem("favorites"));

  if (favoriteData) {
    return { favorites: favoriteData };
  }

  return initialValue;
};

export const FavoriteContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  return <FavoriteContext.Provider value={[state, dispatch]}>{props.children}</FavoriteContext.Provider>;
};
