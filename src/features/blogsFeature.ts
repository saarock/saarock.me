import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Blog } from "../interfaces/blogs"




const initialState: Blog[] = [

]


const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        addBlogs(state, action: PayloadAction<Blog[]>) {
            state.push.apply(state, action.payload);
        },
    }
});

export const { addBlogs } = blogSlice.actions;

export default blogSlice.reducer;
