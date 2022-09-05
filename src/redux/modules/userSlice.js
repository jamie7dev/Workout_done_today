import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const __login = createAsyncThunk(
  "data/login",
  async (payload, thunkAPI) => {
      try {
          console.log(payload);
          const data =  await axios.post("http://15.164.212.207:8080/api/login", payload);
          console.log(data);
          localStorage.setItem("token1", data.headers.authorization)
          localStorage.setItem("token2", data.headers.refreshtoken)
          localStorage.setItem("username",data.data.data.username)
          if(data.data.success===false)
              alert(data.data.error.message);
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
  }
);

export const userSlice = createSlice({

  name:"user", 
  initialState:{
    user:null //user has not loged in
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      axios.post("http://15.164.212.207:8080/api/login", action.payload)
    },
    logout(state){
      localStorage.removeItem("token1")
      localStorage.removeItem("token2")
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