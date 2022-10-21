import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recent: [],
}

const recent = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        setRecent: (state, action) => {
            state.recent = action.payload
        }
    }
})

export const { setRecent } = recent.actions
export default recent.reducer