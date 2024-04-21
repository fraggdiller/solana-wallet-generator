import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { Keys, SolanaWallet } from '../other/types';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { derivationPath, pathRegex } from '../other/constants';
import base58 from 'bs58';
import { createHmac, Hmac } from 'node:crypto';

export default class Crypto {

    protected static getSolanaWalletFromMnemonic (mnemonic: string): SolanaWallet {
        const key: Buffer = Crypto.derive(mnemonic, derivationPath, 'ed25519 seed');
        const publicKeyBuffer: Uint8Array = nacl.sign.keyPair.fromSeed(key).publicKey;
        const secretKey: Buffer = Buffer.concat([key, Buffer.from(publicKeyBuffer)]);

        const keypair: Keypair = Keypair.fromSecretKey(secretKey);

        return {
            mnemonic: mnemonic,
            privateKey: base58.encode(keypair.secretKey),
            address: keypair.publicKey.toString(),
        };
    };

    protected static getSolanaWalletFromPrivateKey (privateKey: string): SolanaWallet {
        const keypair: Keypair = Keypair.fromSecretKey(base58.decode(privateKey));

        return {
            privateKey: base58.encode(keypair.secretKey),
            address: keypair.publicKey.toString(),
        };
    };

    protected static generateMnemonic (): string {
        return bip39.generateMnemonic(wordlist, 128);
    };

    protected static mnemonicToSeed (mnemonic: string): Uint8Array {
        return bip39.mnemonicToSeedSync(mnemonic);
    };

    private static derive (mnemonic: string, path: string, curve: string): Buffer {
        const hexSeed: string = this.toHEX(this.mnemonicToSeed(mnemonic));
        const { key }: Keys = this.derivePath(path, hexSeed, curve);

        return key;
    };

    private static getMasterKeyFromSeed (seed: string, curve: string): Keys {
        const hmac: Hmac = createHmac('sha512', curve);
        const I: Buffer = hmac.update(Buffer.from(seed, 'hex')).digest();
        const IL: Buffer = I.slice(0, 32);
        const IR: Buffer = I.slice(32);
        return {
            key: IL,
            chainCode: IR,
        };
    };

    private static CKDPriv ({ key, chainCode }: Keys, index: number): Keys {
        const indexBuffer: Buffer = Buffer.allocUnsafe(4);
        indexBuffer.writeUInt32BE(index, 0);
        const data: Buffer = Buffer.concat([Buffer.alloc(1, 0), key, indexBuffer]);
        const I: Buffer = createHmac('sha512', chainCode)
            .update(data)
            .digest();
        const IL: Buffer = I.slice(0, 32);
        const IR: Buffer = I.slice(32);
        return {
            key: IL,
            chainCode: IR,
        };
    };

    private static isValidPath (path: string): boolean {
        if (!pathRegex.test(path)) {
            return false;
        }
        return path
            .split('/')
            .slice(1)
            .map(this.replaceDerive)
            .every((element: string) => !isNaN(Number(element)));
    };

    private static derivePath = (path: string, seed: string, curve: string, offset: number = 0x80000000): Keys => {
        if (!this.isValidPath(path)) {
            throw new Error('Invalid derivation path');
        }
        const { key, chainCode }: Keys = this.getMasterKeyFromSeed(seed, curve);
        const segments: number[] = path
            .split('/')
            .slice(1)
            .map(this.replaceDerive)
            .map((el: string): number => parseInt(el as string, 10));
        return segments.reduce((parentKeys: Keys, segment: number): Keys => this.CKDPriv(parentKeys, segment + offset), { key, chainCode });
    };

    private static toHEX (bytes: Uint8Array): string {
        return bytes.reduce((str: string, byte: number): string => str + byte.toString(16).padStart(2, '0'), '');
    };

    private static replaceDerive = (val: string): string => val.replace("'", '');
}