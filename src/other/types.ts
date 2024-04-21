export type SolanaWallet = {
    mnemonic?: string,
    privateKey: string
    address: string,
};

export type Keys = {
    key: Buffer;
    chainCode: Buffer;
};