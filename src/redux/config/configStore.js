import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../modules/userSlice';
import signupSlice from '../modules/signUp';
import commentSlice from '../modules/Comment';
import postSlice from "../modules/addPost";

const store = configureStore({

  reducer: {
    user: userSlice,
    signup: signupSlice.reducer,
    comment: commentSlice.reducer,
    post: postSlice.reducer
  }

});

export default store;