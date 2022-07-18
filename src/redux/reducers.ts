import { combineReducers } from "redux";

import web3Slice from "redux/slices/web3Slice";
import tokenSlice from "redux/slices/tokenSlice";

const rootReducer = combineReducers({ web3Slice, tokenSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
