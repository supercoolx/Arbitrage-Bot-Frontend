import React, { useEffect } from "react";
import axios from "axios";
import Swap from "components/Swap";
import useWeb3 from "redux/actions/web3Action";
import useToken from "redux/actions/tokenAction";
import { SwapData } from "utils/types";

const SwapList = () => {
    const { network } = useWeb3();
    const { tokens, swapDatas, clearSwapData, pushSwapData } = useToken();
    useEffect(() => {
        console.log('Token changed');
        clearSwapData();
        if (tokens.length < 2) return;
        (async () => {
            let input = '1000000000000000000';
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
                pushSwapData(res);
            }
        })();
    }, [tokens]);

    return (
        <div className="flex-1 mt-3">
            <div className="flex flex-col gap-3">
                {
                    swapDatas.map((swapdata, key) => <Swap key={key} data={swapdata} />)
                }
            </div>
        </div>
    )
}

export default SwapList;