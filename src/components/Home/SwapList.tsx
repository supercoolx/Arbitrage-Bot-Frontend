import React, { useEffect, useState } from "react";
import axios from "axios";
import BN from "bignumber.js";
import Swap from "components/utils/Swap";
import useWeb3 from "redux/actions/web3Action";
import useToken from "redux/actions/tokenAction";
import { SwapData } from "utils/types";
import Profit from "./Profit";

const SwapList = () => {
    const { web3, network, block } = useWeb3();
    const { tokens, swapDatas, initial, changeInitial,  clearSwapData, pushSwapData } = useToken();
    const [isShow, setShow] = useState<boolean>(false);

    useEffect(() => {
        setShow(false);
        clearSwapData();
        if (tokens.length < 2) return;
        (async () => {
            const blockNumber = await web3.eth.getBlockNumber();
            let input = new BN(initial).times(new BN(10).pow(tokens[0].decimals)).toFixed();
            for (let key in tokens) {
                let next = (parseInt(key) + 1) % tokens.length;
                const { data: res }: { data: SwapData } = await axios.get(`https://api.1inch.exchange/v4.0/${network}/swap`, {
                    params: {
                        fromTokenAddress: tokens[key].address,
                        toTokenAddress: tokens[next].address,
                        amount: input,
                        fromAddress: '0xA5904B4E8bf6f6B69545e495a7f2A695B9C320f4',
                        slippage: 1,
                        disableEstimate: true
                    }
                });
                input = res.toTokenAmount;
                blockNumber === block?.number && pushSwapData(res);
            }
            if (blockNumber !== block?.number) return;
            setShow(true);
        })();
    }, [tokens, block?.number, initial]);

    const onKeyDown = (e) => {
        if (e.keyCode === 13) changeInitial(e.target.value);
    }

    return (
        <div className="flex-1 pr-5">
            <div className="flex items-center gap-5 py-3">
                <div>Initial Amount</div>
                <input type="number" onKeyDown={onKeyDown} className="px-2 py-1 border rounded-md outline-none" />
            </div>
            <div className="flex flex-col gap-3">
                { swapDatas.map((swapdata, key) => <Swap key={key} data={swapdata} />) }
            </div>
            { isShow ? <Profit /> : null }
        </div>
    )
}

export default SwapList;