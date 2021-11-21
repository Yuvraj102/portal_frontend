const productionBaseLink = "https://portalbackend44.herokuapp.com/api/v1/";
const developmentBaseLink = "http://localhost:5000/api/v1/";
let basleLink = productionBaseLink;
if (process.env.NODE_ENV === "development") {
  basleLink = developmentBaseLink;
}

export const getloginUrlLink = basleLink + "user/getGoogleLink";

export const getAllQuestionsLink = basleLink + "question/getAllQuestions";

export const getUserFromTokenLink = basleLink + "user/getMe";

// add /id while  using
export const getCommentsOnPostLink = basleLink + "comment/getCommentsForPost/";

export const getCreatePostLink = basleLink + "comment/createComment";

export const getUpdateUserLink = basleLink + "user/updateUser";

export const getCreateQuestionLink = basleLink + "question/create";

export const getVoteLink = basleLink + "question/votePost";
