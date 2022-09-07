import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const __getComments = createAsyncThunk(
  "data/getComments",
  async (payload, thunkAPI) => {
      try {
          console.log(payload);
          const data =  await axios.get(`http://3.38.192.170:8080/api/comment/${payload}`, 
          {headers: {
            "Authorization": localStorage.getItem("Authorization"),   //accesstoken
            "RefreshToken": localStorage.getItem("RefreshToken"),
            "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        }});
          console.log(data);
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createComment: (state, action) => {
      state.data.data.push(action.payload);
    },
    removeComment: (state, action) => {
        let index = state.data.data.findIndex(
          (comment) => comment.id === action.payload);
        state.data.data.splice(index, 1);
    },
    updateComment: (state, action) => {
        let index = state.data.data.findIndex(post => post.id === action.payload.id);
        state.data.data.splice(index, 1, action.payload);
    }  
  },

extraReducers: {
  [__getComments.pending]: (state) => {
    state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
  },
  [__getComments.fulfilled]: (state, action) => {
    state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
  },
  [__getComments.rejected]: (state, action) => {
    state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
  },
  }
});

export const { createComment, removeComment, updateComment } = commentSlice.actions;
export default commentSlice;