import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store"
import { setToken, clearSwapData, pushSwapData } from "redux/slices/tokenSlice";
import { Token, SwapData } from "utils/types";

const useToken = () => {
    const dispatch = useAppDispatch();
    const { tokens, swapDatas } = useSelector((state: RootState) => state.tokenSlice);

    return {
        tokens, swapDatas,
        changeToken: (tokens: Token[]) => dispatch(setToken({ tokens })),
        clearSwapData: () => dispatch(clearSwapData()),
        pushSwapData: (swapData: SwapData) => dispatch(pushSwapData({ swapData }))
    }
}

export default useToken;