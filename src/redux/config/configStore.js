import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../modules/userSlice';
import signupSlice from '../modules/signUp';


const store = configureStore({

  reducer: {
    user: userSlice,
    signup: signupSlice
  }

});

export default store;