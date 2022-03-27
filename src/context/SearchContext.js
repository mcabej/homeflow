import React, { useReducer, createContext } from "react";

export const SearchContext = createContext();

const initialState = {
  filter: {
    primaryChannel: "",
    minPrice: 0,
    maxPrice: 999999,
    bedrooms: 0,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FILTER":
      return {
        filter: { ...state.filter, ...action.payload },
      };
    default:
      return {
        state,
      };
  }
};

export const SearchContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <SearchContext.Provider value={[state, dispatch]}>{props.children}</SearchContext.Provider>;
};
