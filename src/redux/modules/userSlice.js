import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name:"user", 
  initialState:{
    user:null //user has not loged in
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      axios.post("http://localhost:3001/userinfo", action.payload)
    }
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;