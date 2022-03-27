import React, { useReducer, createContext } from "react";

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
      return {
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_ITEM":
      const temp = [...state.favorites];
      const filtered = temp.filter((el) => el.propertyId != action.payload.propertyId);

      return {
        favorites: [...filtered],
      };
    default:
      return {
        state,
      };
  }
};

export const FavoriteContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <FavoriteContext.Provider value={[state, dispatch]}>{props.children}</FavoriteContext.Provider>;
};
