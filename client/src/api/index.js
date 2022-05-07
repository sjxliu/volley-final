import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts/?page=${page}`);
export const fetchSearchedPosts = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}`);
export const newPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const supportPost = (id) => API.patch(`/posts/${id}/supportPost`);

export const signIn = (signupData) => API.post("/user/signin", signupData);
export const signUp = (signupData) => API.post("/user/signup", signupData);
