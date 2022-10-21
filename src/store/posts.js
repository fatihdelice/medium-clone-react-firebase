import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        appendPosts: (state, action) => {
            state.posts = [... state.posts, action.payload]
        }
    }
})

export const { setPosts, appendPosts } = posts.actions
export default posts.reducer