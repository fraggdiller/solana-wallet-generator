import { Keypair } from '@solana/web3.js';
import bip39 from 'bip39';
import ed25519 from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { base58_to_binary, binary_to_base58 } from 'base58-js';


export default class SolanaWallet {
    async generateMnemonic () {
        return bip39.generateMnemonic(128);
    };

    async #mnemonicToSeed (mnemonic) {
        return await bip39.mnemonicToSeed(mnemonic);
    };

    async fromMnemonic (mnemonic, path = "m/44'/501'/0'/0'") {
        const seed = await this.#mnemonicToSeed(mnemonic);
        const hdKey = ed25519.derivePath(path, seed.toString('hex'));
        const publicKeyBuffer = nacl.sign.keyPair.fromSeed(hdKey.key).publicKey;
        const secretKey = Buffer.concat([Buffer.from(hdKey.key), Buffer.from(publicKeyBuffer)]);
        const keypair = Keypair.fromSecretKey(secretKey);

        return {
            privateKey: binary_to_base58(keypair.secretKey),
            publicKey: keypair.publicKey.toString(),
        };
    };

    async fromPrivateKey (privateKey) {
        const keyapair = Keypair.fromSecretKey(base58_to_binary(privateKey));

        return keyapair.publicKey.toString();
    }
};
