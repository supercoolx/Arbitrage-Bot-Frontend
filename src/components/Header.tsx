import React, { useEffect } from "react";
import useWeb3 from "redux/actions/web3Action";

export const Header = () => {
	const { web3, block, network, changeBlock, changeNetwork } = useWeb3();
	useEffect(() => {
		web3.eth.getChainId().then(changeNetwork).catch(console.error);
		web3.eth.getBlockNumber().then(num => web3.eth.getBlock(num)).then(changeBlock).catch(console.error);
		web3.eth.subscribe('newBlockHeaders', (err, block) => !err && changeBlock(block));

		return () => web3.eth.clearSubscriptions(() => {});
	}, []);

	return (
		<div className="text-center bg-gray-800">
			<div className="container flex items-center justify-between mx-auto my-3"  >
				<img src="/icons/react-icon.svg" alt="react" width="40" height="40" />
				<span className="text-white">{network} {block?.number}</span>
			</div>
		</div>
	);
};
