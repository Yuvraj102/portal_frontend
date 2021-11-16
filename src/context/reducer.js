export const initialState = {
  user: null,
  token: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log("login triggered", action.token);
      // return { ...state, token: action.token };
      return { ...state, token: action.token };
    case "USER_FETCHED":
      return { ...state, user: action.user };
    default:
      return state;
  }
};
