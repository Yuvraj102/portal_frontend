export const initialState = {
  user: null,
  token: null,
  feedQuestions: [],
  questionsForUser: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.token };
    case "USER_FETCHED":
      return { ...state, user: action.user };
    case "FEED_QUESTIONS_FETCHED":
      return { ...state, feedQuestions: action.questions };
    case "USER_QUESTIONS_FETCHED":
      return { ...state, questionsForUser: action.questions };
    default:
      return state;
  }
};
