const baseURL = "http://localhost:8080";

export const signupURL = `${baseURL}/auth/register`;

export const loginURL = `${baseURL}/auth/login`;

export const createPost = `${baseURL}/post/create`;
export const getAllPosts = `${baseURL}/post/all`;
export const updatePost = (id) => `${baseURL}/post/update/${id}`;
export const deletePost = (id) => `${baseURL}/post/delete/${id}`;
export const getSinglePost = (id) => `${baseURL}/post/${id}`;

export const getUserData = `${baseURL}/auth/getUserData`;

//Request headers used in sending requests to server-----------------------
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};
