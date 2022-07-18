import React, { useEffect } from "react";
import useWeb3 from "redux/actions/web3Action";

const StateManagement = ({ children }) => {
    const { web3, changeBlock, changeNetwork } = useWeb3();

	useEffect(() => {
		web3.eth.getChainId().then(changeNetwork).catch(console.error);
		web3.eth.getBlockNumber().then(num => web3.eth.getBlock(num)).then(changeBlock).catch(console.error);
		web3.eth.subscribe('newBlockHeaders', (err, block) => !err && changeBlock(block));
        window.ethereum.on('chainChanged', (_chainId) => changeNetwork(parseInt(_chainId)));

		return () => web3.eth.clearSubscriptions(() => {});
	}, []);

    return children;
}

export default StateManagement;