const productionBaseLink = "https://portalbackend44.herokuapp.com/api/v1/";
const developmentBaseLink = "http://localhost:5000/api/v1/";

export const getloginUrlLink = productionBaseLink + "user/getGoogleLink";

export const getAllQuestionsLink =
  productionBaseLink + "question/getAllQuestions";

export const getUserFromTokenLink = productionBaseLink + "user/getMe";

// add /id while  using
export const getCommentsOnPostLink =
  productionBaseLink + "comment/getCommentsForPost/";

export const getCreatePostLink = productionBaseLink + "comment/createComment";

export const getUpdateUserLink = productionBaseLink + "user/updateUser";

export const getCreateQuestionLink = productionBaseLink + "question/create";

export const getVoteLink = productionBaseLink + "question/votePost";
