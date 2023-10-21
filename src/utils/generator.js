import SolanaWallet from './wallet.js';


export default class Generator extends SolanaWallet {
    async generateWallet (num) {
        const wallets = [];
        for (let i = 0; i < num; i++) {
            const mnemonic = await this.generateMnemonic();
            const wallet = await this.fromMnemonic(mnemonic);
            wallets.push({
                mnemonic: mnemonic,
                ...wallet
            });
        }
        return wallets;
    };
};
