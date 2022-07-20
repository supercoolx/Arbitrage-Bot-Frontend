import React from "react";
import useWeb3 from "redux/actions/web3Action";

export const Header = () => {
	const { web3, block, account, network, changeAccount } = useWeb3();
	const connectWallet = () => 
		web3.eth.requestAccounts()
		.then(accounts => changeAccount(accounts[0]))
		.catch(console.log);

	return (
		<div className="text-center bg-gray-800">
			<div className="container flex items-center justify-between mx-auto my-3"  >
				<div className="flex flex-col items-start justify-between">
					<div className="text-white">Network ID: <span className="text-yellow-500">{network}</span></div>
					<div className="text-white">Block Number: <span className="text-yellow-500">{block?.number}</span></div>
				</div>
				<button className="px-3 py-2 text-white border" onClick={connectWallet}>{account || "Connect Metamask"}</button>
			</div>
		</div>
	);
};
