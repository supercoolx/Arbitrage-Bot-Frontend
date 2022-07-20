import React, { useEffect, useState } from "react";
import { AbiItem } from "web3-utils";
import { Token } from "utils/types";
import Chainlink from "utils/metadata/chainlink.json";
import ChainlinkABI from "utils/abi/chainlink.json";
import useWeb3 from "redux/actions/web3Action";

const link = {
    "1": "https://etherscan.io",
    "56": "https://bscscan.com"
}

const TokenComponent = ({ token }: { token: Token }) => {
    const [price, setPrice] = useState<string>('---');
    const { web3, network, block } = useWeb3();
    useEffect(() => {
        if (!(Chainlink[network] && Chainlink[network][token.symbol])) return setPrice('N/A');
        const contract = new web3.eth.Contract(ChainlinkABI as AbiItem[], Chainlink[network][token.symbol]);
        contract.methods.latestAnswer().call()
        .then((res: string) => {
            const price = parseInt(res.slice(0, res.length - 6)) / 100;
            setPrice(price.toString());
        })
        .catch(console.error);
    }, [block.number, token.symbol]);

    return (
        <div className="flex gap-5 p-3 border shadow-md">
            <img src={token.logoURI} className="w-16 h-16" alt="" />
            <div className="w-full">
                <div className="flex justify-between">
                    <div>{token.name} ($ {price})</div>
                    {
                        link[network] ? <a href={`${link[network]}/token/${token.address}`} target="_blank" rel="noreferer">🌐</a> : null
                    }
                </div>
                <div>Decimal: {token.decimals}</div>
                <div>Symbol: {token.symbol}</div>
            </div>
        </div>
    )
}

export default TokenComponent;