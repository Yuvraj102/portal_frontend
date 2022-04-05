import axios from "./axiosConfig";
import {
  getAllQuestionsLink,
  getCommentsOnPostLink,
  getCreatePostLink,
  getUpdateUserLink,
  getCreateQuestionLink,
  getVoteLink,
  getDeletePostLink,
  getUploadFileLink,
  getTeachersLink,
  getTeacherWithEmailLink,
  getNotesLink,
  getDeleteNoteLink,
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
export const uploadFile = async (title, file, token) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  formData.append("token", token);
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
      url: getUploadFileLink,
    };

    const createdNote = await axios(options);

    return createdNote.data;
  } catch (err) {
    alert("err uploading notes");
    console.log(err.response.data);
    return null;
  }
};

export const getTeachers = async (query = "") => {
  const options = {
    method: "GET",
    url: getTeachersLink + `?name=${query}`,
  };

  try {
    const teachersData = await axios(options);
    return teachersData.data;
  } catch (err) {
    console.log(err.response.data);
    return null;
  }
};
// get one teacher with email
export const getTeacherByEmail = async (email) => {
  const options = {
    method: "GET",
    url: getTeacherWithEmailLink + `?email=${email}`,
  };

  try {
    const teachersData = await axios(options);
    return teachersData.data;
  } catch (err) {
    console.log(err.response.data);
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

export const deletePost = async (postId, token) => {
  if (window.confirm("are u sure?")) {
    try {
      axios
        .delete(getDeletePostLink + `${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          if (data) {
            alert("post deleted successfully");
          }
        })
        .catch((err) => {
          alert("err deleting post ");
          console.log(err);
        });
    } catch (err) {
      alert("err deleting post axios");
      console.log(err);
    }
  }
};

// get notes for a user with email
export const getNotes = async (email) => {
  const options = {
    method: "GET",
    url: getNotesLink + `?email=${email}`,
  };

  try {
    const notesData = await axios(options);
    return notesData.data;
  } catch (err) {
    console.log(err.response.data);
    return null;
  }
};
// delete notes

export const deleteNote = async (id, token) => {
  const options = {
    method: "GET",
    url: getDeleteNoteLink + `?id=${id}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const notesData = await axios(options);
    return notesData;
  } catch (err) {
    console.log(err.response.data);
    return null;
  }
};
