import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./auth";
import posts from "./posts";
import recent from "./recent";
import modal from "./modal";

const store = configureStore({

    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
    reducer: {
        auth,
        modal,
        posts,
        recent
    }
})

export default store