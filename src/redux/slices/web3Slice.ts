import Web3 from "web3";
import { BlockHeader } from "web3-eth";
import { createSlice } from "@reduxjs/toolkit"

type stateType = {
    context: Web3
    network: string
    block: BlockHeader
    account: string
}

const initialState: stateType = {
    block: null,
    network: "1",
    context: new Web3(window.ethereum),
    account: ""
}

const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setBlock: (state, action) => { state.block = action.payload.block },
        setAccount: (state, action) => { state.account = action.payload.account },
        setNetwork: (state, action) => { state.network = action.payload.network }
    }
});

export const { setAccount, setBlock, setNetwork } = web3Slice.actions;
export default web3Slice.reducer;