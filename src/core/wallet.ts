import Crypto from './crypto';
import { SolanaWallet } from '../other/types';


export default class Wallet extends Crypto {

    public static generateWallet (count: number): SolanaWallet[] {
        const wallets: SolanaWallet[] = [];

        for (let i: number = 0; i < count; i++) {
            const mnemonic: string = this.generateMnemonic();

            const generatedWallet: SolanaWallet = this.processWalletFromMnemonic(mnemonic);

            wallets.push(generatedWallet);
        }

        return wallets;
    };

    public static getWalletFromMnemonic (mnemonics: string[]): SolanaWallet[] {
        const wallets: SolanaWallet[] = [];

        for (let i: number = 0; i < mnemonics.length; i++) {
            const mnemonic: string = mnemonics[i];
            const generatedWallet: SolanaWallet = this.processWalletFromMnemonic(mnemonic);

            wallets.push(generatedWallet);
        }

        return wallets;
    };

    public static getWalletFromPrivateKey (privateKeys: string[]): SolanaWallet[] {
        const wallets: SolanaWallet[] = [];

        for (let i: number = 0; i < privateKeys.length; i++) {
            const privateKey: string = privateKeys[i];
            const generatedWallet: SolanaWallet = this.processWalletFromPrivateKey(privateKey);

            wallets.push(generatedWallet);
        }

        return wallets;
    };

    private static processWalletFromMnemonic (mnemonic: string): SolanaWallet {
        return this.getSolanaWalletFromMnemonic(mnemonic);
    };

    private static processWalletFromPrivateKey (privateKey: string): SolanaWallet {
        return this.getSolanaWalletFromPrivateKey(privateKey);
    };
}