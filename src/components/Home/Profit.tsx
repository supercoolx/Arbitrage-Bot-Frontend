import React from "react";
import BN from "bignumber.js";
import { AbiItem } from "web3-utils";
import abi from "utils/abi/flashswap.json";
import useWeb3 from "redux/actions/web3Action";
import useToken from "redux/actions/tokenAction";
import address from "utils/metadata/address.json";
import { CallData } from "utils/types";
import { toPrintable } from "utils/utils";
import ERC20 from "utils/abi/erc20.json";

const Profit = () => {
    const { web3, network, account } = useWeb3();
    const { swapDatas } = useToken();
    const profit = swapDatas.length > 1 ? new BN(swapDatas[swapDatas.length - 1].toTokenAmount).minus(swapDatas[0].fromTokenAmount) : new BN(0);
    const startTrade = async () => {
        if (profit.lte(0) || !address[network]) return;
        if (!account) return alert('Please connect metamask wallet.');
        const contract = new web3.eth.Contract(abi as AbiItem[], address[network]);
        const erc20 = new web3.eth.Contract(ERC20 as AbiItem[], '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
        const callData: CallData[] = [];
        swapDatas.forEach((data) => {
            const approve: CallData = [
                data.fromToken.address,
                erc20.methods.approve(
                    data.tx.to,
                    data.fromTokenAmount
                ).encodeABI()
            ];
            const swap: CallData = [data.tx.to, data.tx.data];
            callData.push(approve, swap);
        });

        console.log(callData);

        try {
            await contract.methods.flashloan(
                swapDatas[0].fromToken.address,
                swapDatas[swapDatas.length - 1].fromTokenAmount,
                callData
            ).send({
                from: account,
                gas: '800000'
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="pt-5">
            <hr />
            <div className="flex justify-between p-3 mt-5 border rounded-md shadow-md">
                <div className="flex items-center gap-5">
                    <img src={swapDatas[0].fromToken.logoURI} className="w-10 h-10" alt="" />
                    <div>{
                        toPrintable(
                            profit,
                            swapDatas[0].fromToken
                        )
                    }</div>
                </div>
                <button onClick={startTrade} className={`px-5 py-2 font-bold text-white rounded-md shadow-md ${profit.gt(0) ? 'bg-green-400' : 'bg-red-500'}`}>Trade</button>
            </div>
        </div>
    )
}

export default Profit;