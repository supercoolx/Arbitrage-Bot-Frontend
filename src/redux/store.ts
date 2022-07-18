import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import rootReducer from "./reducers";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
});

const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
