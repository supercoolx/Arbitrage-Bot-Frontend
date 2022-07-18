import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store"
import { setToken, setInitial, clearSwapData, pushSwapData } from "redux/slices/tokenSlice";
import { Token, SwapData } from "utils/types";

const useToken = () => {
    const dispatch = useAppDispatch();
    const { tokens, initial, swapDatas } = useSelector((state: RootState) => state.tokenSlice);

    return {
        tokens, initial, swapDatas,
        changeToken: (tokens: Token[]) => dispatch(setToken({ tokens })),
        changeInitial: (initial: string) => dispatch(setInitial({ initial })),
        clearSwapData: () => dispatch(clearSwapData()),
        pushSwapData: (swapData: SwapData) => dispatch(pushSwapData({ swapData }))
    }
}

export default useToken;