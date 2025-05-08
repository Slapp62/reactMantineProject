import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import userSlice from "./userSlice";
import cardSlice from "./cardSlice";


export const store = configureStore({
    reducer: {
        userSlice,
        searchSlice,
        cardSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;