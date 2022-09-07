import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../modules/userSlice';
import signupSlice from '../modules/signUp';
import commentSlice from '../modules/Comment';


const store = configureStore({

  reducer: {
    user: userSlice,
    signup: signupSlice.reducer,
    comment: commentSlice.reducer
  }

});

export default store;