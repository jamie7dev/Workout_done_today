import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    isLoading: false,
    error: null,
    success: false,
}

export const __getPosts = createAsyncThunk(
    "data/getPosts",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get("http://3.36.71.186:8080/api/posts");
            // console.log(data.data);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);
const token = localStorage.getItem("Authorization");
const refreshToken = localStorage.getItem("RefreshToken");

export const __deletePosts = createAsyncThunk(
    "posts/deletePosts",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.delete(`http://3.36.71.186:8080/api/auth/posts/${payload}`, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                }
            });
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);

export const __updatePosts = createAsyncThunk(
    "posts/updatePosts",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.post(`http://3.36.71.186:8080/api/auth/posts/${payload}`, payload, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                },
            });
            alert("그림일기 수정 완료!")
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);

export const postsSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(__deletePosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(__deletePosts.fulfilled, (state, action) => {
                state.isLoading = false;
                // let index = state.posts.findIndex((post) => post.id === action.payload);
                // state.posts.splice(index, 1);
            })
            .addCase(__deletePosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(__updatePosts.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(__updatePosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    },
});

// export const { createPost, deletePost, updatePost} = postsSlice.actions;
export default postsSlice.reducer;
