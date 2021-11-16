import axios from "./axiosConfig";
import {
  getAllQuestionsLink,
  getCommentsOnPostLink,
  getCreatePostLink,
  getUpdateUserLink,
  getCreateQuestionLink,
  getVoteLink,
} from "./urls";

export const getAllQuestions = async (token) => {
  try {
    const questions = await axios.get(getAllQuestionsLink, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return questions.data.questions;
  } catch (err) {
    alert("err getting questions");
    console.log(err);
    return null;
  }
};

export const getCommentsOnPost = async (_id, token) => {
  try {
    // console.log(_id);
    const comments = await axios.get(getCommentsOnPostLink + `${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return comments.data.comments;
  } catch (err) {
    alert("err getting comments");
    // console.log(err);
    return null;
  }
};

export const createComment = async (postId, body, token) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({ body, postId }),
      url: getCreatePostLink,
    };

    const createdComment = await axios(options);
    return createdComment.data.comment;
  } catch (err) {
    alert("err getting comments");
    console.log(err);
    return null;
  }
};

export const updateUserInDb = async (data, token) => {
  const options = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      bio: data.bio,
      college: data.college,
      designation: data.designation,
      department: data.department,
    }),
    url: getUpdateUserLink,
  };
  try {
    const updatedUser = await axios(options);
    return updatedUser.data.userToSend;
  } catch (err) {
    alert("err updating user");
    console.log(err);
    return null;
  }
};

export const createQuestion = async (title, body, token) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      title: title,
      body: body,
    }),
    url: getCreateQuestionLink,
  };
  try {
    const createdPost = await axios(options);
    return createdPost.data.savedPost;
  } catch (err) {
    alert("err creating post");
    console.log(err);
    return null;
  }
};

export const voteQuestion = async (upvote, downvote, postId, token) => {
  let vote = "";
  if (upvote) {
    vote = "upvote";
  } else {
    vote = "downvote";
  }
  let dataToSend = {
    id: postId,
  };
  dataToSend[vote] = true;
  const options = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(dataToSend),
    url: getVoteLink,
  };
  try {
    const updatedPost = await axios(options);
    return updatedPost.data.updatedPost;
  } catch (err) {
    alert("err creating post");
    console.log(err);
    return null;
  }
};
