import React from "react";
import { SwapData } from "utils/types";
import { toPrintable } from "utils/utils";

const Swap = ({ data }: { data: SwapData }) => {
    return (
        <div className="flex items-center justify-between gap-5 p-3 border">
            <img src={data.fromToken.logoURI} className="w-10 h-10" alt="" />
            <span>{toPrintable(data.fromTokenAmount, data.fromToken)}</span>
            <span>-&gt;</span>
            <span>{toPrintable(data.toTokenAmount, data.toToken)}</span>
            <img src={data.toToken.logoURI} className="w-10 h-10" alt="" />
        </div>
    )
}

export default Swap;