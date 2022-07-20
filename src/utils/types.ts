export type BaseToken = {
    name: string
    address: string
    symbol: string
    decimals: number
    logoURI: string
}

export type Token = BaseToken & {
    id: string
    chainId: number
}

type SwapToken = BaseToken & {
    tags: string[]
}

type Protocol = {
    name: string
    part: number
    fromTokenAddress: string
    toTokenAddress: string
}

type Transaction = {
    from: string
    to: string
    data: string
    value: string
    gas: number
    gasPrice: string
}

export type SwapData = {
    fromToken: SwapToken
    fromTokenAmount: string
    toToken: SwapToken
    toTokenAmount: string
    protocols: [[ Protocol[] ]]
    tx: Transaction
}

export type CallData = [
    address: string,
    byteEncoded: string
]