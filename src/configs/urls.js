const baseLink = "http://localhost:5000/api/v1/";

export const getloginUrlLink = baseLink + "user/getGoogleLink";

export const getAllQuestionsLink = baseLink + "question/getAllQuestions";

export const getUserFromTokenLink = baseLink + "user/getMe";

// add /id while using
export const getCommentsOnPostLink = baseLink + "comment/getCommentsForPost/";

export const getCreatePostLink = baseLink + "comment/createComment";

export const getUpdateUserLink = baseLink + "user/updateUser";
