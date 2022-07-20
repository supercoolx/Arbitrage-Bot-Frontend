import React, { useEffect } from "react";
import useWeb3 from "redux/actions/web3Action";

const StateManagement = ({ children }) => {
    const { web3, network, changeAccount, changeBlock, changeNetwork } = useWeb3();

	useEffect(() => {
		web3.eth.getBlockNumber().then(num => web3.eth.getBlock(num)).then(changeBlock).catch(console.error);
		web3.eth.subscribe('newBlockHeaders', (err, block) => !err && changeBlock(block));
		return () => web3.eth.clearSubscriptions(() => {});
	}, [network]);
	useEffect(() => {
		web3.eth.getChainId().then(changeNetwork).catch(console.error);
		changeAccount(window.ethereum.selectedAddress);
        window.ethereum.on('chainChanged', (_chainId) => {
			changeNetwork(_chainId);
			web3.setProvider(window.ethereum);
		});
		window.ethereum.on('accountsChanged', (_accounts) => {
			if(_accounts.length) changeAccount(_accounts[0]);
			else console.log('Please connect to MetaMask.');
		});
	}, []);

    return children;
}

export default StateManagement;