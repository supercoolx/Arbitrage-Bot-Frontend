import React, { useEffect, useMemo } from "react";
import Token from "utils/metadata/token.json";
import useWeb3 from "redux/actions/web3Action";
import useToken from "redux/actions/tokenAction";
import { WithContext as ReactTags } from "react-tag-input";
import "assets/css/react_tag_input.css";
import TokenComponent from "components/utils/Token";

const TokenSelect = () => {
	const { network } = useWeb3();
	const { tokens, changeToken } = useToken();
	const availableTokens = useMemo(() => 
		Token.filter(t => t.chainId.toString() === network)
		.map(t => ({ ...t, text: `${t.name} (${t.symbol})`}))
	, [network]);

	const handleDelete = i => changeToken(tokens.filter((tag, index) => index !== i));
	const handleAddition = tag => changeToken([...tokens, tag]);
	const handleDrag = (tag, currPos, newPos) => {
		const newTags = tokens.slice();
		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);
		changeToken(newTags);
	};

	useEffect(() => { changeToken([]); }, [network]);

	return (
		<div className="flex-1 px-5">
			<ReactTags
				tags={tokens}
				suggestions={availableTokens}
				delimiters={[188, 13]}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				handleDrag={handleDrag}
				inputFieldPosition='bottom'
				placeholder='Input token to trade'
				minQueryLength={0}
				autofocus={false}
				autocomplete
			/>
			<div className="flex flex-col gap-3 pt-10">
				{ tokens.map((token, key) => <TokenComponent key={key} token={token} />) }
			</div>
		</div>
	);
};


export default TokenSelect;