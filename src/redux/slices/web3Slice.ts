import Web3 from "web3";
import { BlockHeader } from "web3-eth";
import { createSlice } from "@reduxjs/toolkit"

type stateType = {
    context: Web3
    network: number
    block: BlockHeader
}

const initialState: stateType = {
    block: null,
    network: 1,
    context: new Web3(window.ethereum),
}

const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setBlock: (state, action) => { state.block = action.payload.block },
        setNetwork: (state, action) => {state.network = action.payload.network }
    }
});

export const { setBlock, setNetwork } = web3Slice.actions;
export default web3Slice.reducer;