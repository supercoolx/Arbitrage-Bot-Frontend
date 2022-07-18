import { createSlice } from "@reduxjs/toolkit";
import { Token, SwapData } from "utils/types";

type stateType = {
    tokens: Token[]
    swapDatas: SwapData[]
}

const initialState: stateType = {
    tokens: [],
    swapDatas: []
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => { state.tokens = action.payload.tokens },
        clearSwapData: (state) => { state.swapDatas = [] },
        pushSwapData: (state, action) => { state.swapDatas.push(action.payload.swapData); }
    }
});

export const { setToken, clearSwapData, pushSwapData } = tokenSlice.actions;
export default tokenSlice.reducer;