import { FETCH_ALL, DELETE, UPDATE, CREATE, FETCH_BY_FILTERS, START_LOAD, END_LOAD, FETCH_BY_ID, LIKE } from "../calls/callTypes";
import * as api from "../api/index.js";


//action creators = func that return action(object w/ type & payload)

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOAD})
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_BY_ID, payload: {post: data} });
    // dispatch({type: END_LOAD})
  } catch (error) {
    console.log(error);
  }
};


export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOAD})
    const { data: {data, currentPage, numberOfPages} } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({type: END_LOAD})
  } catch (error) {
    console.log(error);
  }
};

export const getSearchedPosts = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOAD})
    const {
      data: { data },
    } = await api.fetchSearchedPosts(searchQuery);
    // need to destructure data twice bc !st making axios request, 2nd time bc we put in new obj where it has data property
    dispatch({ type: FETCH_BY_FILTERS, payload: { data } });
    dispatch({type: END_LOAD})
   // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const newPost = (post) => async (dispatch) => {
  try {
    dispatch({type: START_LOAD})
    const { data } = await api.newPost(post);
    dispatch({ type: CREATE, payload: data });
   // navigate(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const supportPost = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.supportPost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
