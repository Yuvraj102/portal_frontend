import React, { createContext, useContext, useReducer } from "react";

const stateContext = createContext();
function StateProvider({ children, initialState, reducer }) {
  return (
    <stateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </stateContext.Provider>
  );
}
export const useStateValue = () => useContext(stateContext);
export default StateProvider;
