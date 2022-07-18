import { BlockHeader } from "web3-eth";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { setBlock, setNetwork } from "redux/slices/web3Slice";

const useWeb3 = () => {
    const dispatch = useAppDispatch();
    const { context: web3, block, network } = useSelector((state: RootState) => state.web3Slice);
    const changeBlock = (block: BlockHeader) => dispatch(setBlock({ block }));
    const changeNetwork = (network: number) => dispatch(setNetwork({ network }));

    return {
        web3, block, network,
        changeBlock,
        changeNetwork
    }
}

export default useWeb3;