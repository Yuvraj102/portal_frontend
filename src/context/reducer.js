export const initialState = {
  user: null,
  token: null,
  feedQuestions: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.token };
    case "USER_FETCHED":
      return { ...state, user: action.user };
    case "FEED_QUESTIONS_FETCHED":
      return { ...state, feedQuestions: action.questions };
    default:
      return state;
  }
};
