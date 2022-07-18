import { createSlice } from "@reduxjs/toolkit";
import { Token, SwapData } from "utils/types";

type stateType = {
    initial: string
    tokens: Token[]
    swapDatas: SwapData[]
}

const initialState: stateType = {
    initial: '1',
    tokens: [],
    swapDatas: []
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => { state.tokens = action.payload.tokens },
        setInitial: (state, action) => { state.initial = action.payload.initial },
        clearSwapData: (state) => { state.swapDatas = [] },
        pushSwapData: (state, action) => { state.swapDatas.push(action.payload.swapData); }
    }
});

export const { setToken, setInitial, clearSwapData, pushSwapData } = tokenSlice.actions;
export default tokenSlice.reducer;