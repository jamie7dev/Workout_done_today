import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../modules/userSlice';
import signupSlice from '../modules/signUp';
import postSlice from "../modules/postSlice";

const store = configureStore({

  reducer: {
    user: userSlice,
    signup: signupSlice,
    detail: postSlice
  }

});

export default store;