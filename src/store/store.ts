import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blogsFeature";




export const store =  configureStore({
    reducer: {
        blogs: blogReducer
    }
})