import React from "react";
import { SwapData } from "utils/types";
import { toPrintable } from "utils/utils";

const Swap = ({ data }: { data: SwapData }) => {
    return (
        <div className="flex items-center justify-between gap-5 p-3 border rounded-md shadow-md">
            <div className="flex items-center flex-1 gap-5">
                <img src={data.fromToken.logoURI} className="w-10 h-10" alt="" />
                <span>{toPrintable(data.fromTokenAmount, data.fromToken)}</span>
            </div>
            <div>({data.protocols[0][0].map(pro => pro.name).join(' - ')})</div>
            <div className="flex items-center justify-end flex-1 gap-5">
                <span>{toPrintable(data.toTokenAmount, data.toToken)}</span>
                <img src={data.toToken.logoURI} className="w-10 h-10" alt="" />
            </div>
        </div>
    )
}

export default Swap;