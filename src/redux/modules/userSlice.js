import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//로그인 토큰 받아오기
export const __login = createAsyncThunk(
  "data/login",
  async (payload, thunkAPI) => {

  }
);



export const userSlice = createSlice({

  name: "user",
  initialState: {
    user: null //user has not loged in
  },
  reducers: {
    // login: (state, action) => {
    //   state.user = action.payload;
    //   axios.post("http://15.164.212.207:8080/api/member/login", action.payload)
    // },
    logout(state) {
      localStorage.removeItem("Authorization")   //로그아웃은 token, username 제거
      localStorage.removeItem("RefreshToken")
      localStorage.removeItem("username")
    }
  },

  extraReducers: {
    [__login.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__login.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__login.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },

});



export const { login, logout } = userSlice.actions;
export default userSlice.reducer;