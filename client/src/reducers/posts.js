import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  CREATE,
  FETCH_BY_FILTERS,
  START_LOAD,
  END_LOAD,
  FETCH_BY_ID,
} from "../calls/callTypes";
//turn in obj spread state and return posts
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOAD:
      return { ...state, isLoading: true };
    case END_LOAD:
      return { ...state, isLoading: false };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_FILTERS:
      return { ...state, posts: action.payload.data };
    case FETCH_BY_ID:
      return { ...state, posts: action.payload.data };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};
