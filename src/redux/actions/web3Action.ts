import { BlockHeader } from "web3-eth";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { setBlock, setNetwork, setAccount } from "redux/slices/web3Slice";

const useWeb3 = () => {
    const dispatch = useAppDispatch();
    const { context: web3, block, network, account } = useSelector((state: RootState) => state.web3Slice);
    const changeBlock = (block: BlockHeader) => dispatch(setBlock({ block }));
    const changeNetwork = (networkId: string | number ) => {
        const network = typeof networkId === 'string' ? parseInt(networkId).toString() : networkId.toString();
        dispatch(setNetwork({ network }));
    }
    const changeAccount = (account: string) => dispatch(setAccount({ account }));

    return {
        web3, block, network, account,
        changeBlock,
        changeNetwork,
        changeAccount
    }
}

export default useWeb3;