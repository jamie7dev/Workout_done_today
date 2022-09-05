import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
  data: [],
  isLoading: false,
  error: null,
  success: false,
};

export const __getUsername = createAsyncThunk(
  "data/getUsername",
  async (payload, thunkAPI) => {
      try {
          console.log(payload);
          const data =  await axios.post("http://localhost:3001/data", payload);
          console.log(data);
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
  }
);

export const signupSlice = createSlice({
  name:"signup", 
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      axios.post("http://localhost:3001/data", action.payload)
    }
  },

  extraReducers: {
    [__getUsername.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getUsername.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getUsername.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const { addUser } = signupSlice.actions;
export default signupSlice;