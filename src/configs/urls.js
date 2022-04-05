const productionBaseLink = "https://portalbackend44.herokuapp.com/api/v1/";
const developmentBaseLink = "http://localhost:5000/api/v1/";
let baseLink = productionBaseLink;
const productionServerLink = "https://portalbackend44.herokuapp.com/";
const developmentServerLink = "http://localhost:5000/";
let serverLink = productionServerLink;
if (process.env.NODE_ENV === "development") {
  baseLink = developmentBaseLink;
  serverLink = developmentServerLink;
}
export const serverLinkUrl = serverLink;
export const getloginUrlLink = baseLink + "user/getGoogleLink";

export const getAllQuestionsLink = baseLink + "question/getAllQuestions";

export const getUserFromTokenLink = baseLink + "user/getMe";

// add /id to param
export const getCommentsOnPostLink = baseLink + "comment/getCommentsForPost/";

export const getCreatePostLink = baseLink + "comment/createComment";

export const getUploadFileLink = baseLink + "question/uploadFile";

export const getUpdateUserLink = baseLink + "user/updateUser";

export const getCreateQuestionLink = baseLink + "question/create";

export const getVoteLink = baseLink + "question/votePost";

export const getTeachersLink = baseLink + "user/getTeachers";
export const getTeacherWithEmailLink = baseLink + "user/getTeacherWithEmail";
// add /email to param
export const getQuestionsForUserLink =
  baseLink + "question/getQuestionsForUser/";
// add /postID to param
export const getDeletePostLink = baseLink + "question/deletePost/";

export const getNotesLink = baseLink + "user/getNotes";

export const getDeleteNoteLink = baseLink + "user/deleteNote";
