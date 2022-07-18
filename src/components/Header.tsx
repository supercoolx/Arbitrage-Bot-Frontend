import React from "react";
import useWeb3 from "redux/actions/web3Action";

export const Header = () => {
	const { block, network } = useWeb3();

	return (
		<div className="text-center bg-gray-800">
			<div className="container flex items-center justify-between mx-auto my-3"  >
				<img src="/icons/react-icon.svg" alt="react" width="40" height="40" />
				<div className="flex flex-col items-end justify-between">
					<div className="text-white">Network ID: <span className="text-yellow-500">{network}</span></div>
					<div className="text-white">Block Number: <span className="text-yellow-500">{block?.number}</span></div>
				</div>
			</div>
		</div>
	);
};
