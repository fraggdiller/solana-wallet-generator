import fs from 'node:fs/promises';

export default class FileHandler {
    static async initializeFiles () {
        try {
            await fs.mkdir('./data', { recursive: true });
        } catch (e) {
            console.error('Error creating directory:', e.message);
            throw e;
        }

        try {
            await fs.access('./data/mnemonics.txt');
        } catch {
            await fs.writeFile('./data/mnemonics.txt', '');
        }

        try {
            await fs.access('./data/privateKeys.txt');
        } catch {
            await fs.writeFile('./data/privateKeys.txt', '');
        }

        try {
            await fs.access('./data/addresses.txt');
        } catch {
            await fs.writeFile('./data/addresses.txt', '');
        }
    };

    static async saveWalletsData (wallets, writeMnemonics = true, writePrivateKeys = true, writeAddresses = true) {
        if (writeMnemonics) {
            const mnemonics = (await this.readRawData('mnemonics.txt')).concat(wallets.map(w => w.mnemonic)).join('\n');
            await fs.writeFile('./data/mnemonics.txt', mnemonics);
        }

        if (writePrivateKeys) {
            const privateKeys = (await this.readRawData('privateKeys.txt')).concat(wallets.map(w => w.privateKey)).join('\n');
            await fs.writeFile('./data/privateKeys.txt', privateKeys);
        }

        if (writeAddresses) {
            const addresses = (await this.readRawData('addresses.txt')).concat(wallets.map(w => w.publicKey)).join('\n');
            await fs.writeFile('./data/addresses.txt', addresses);
        }
    };

    static async readRawData (fileName) {
        try {
            const data = await fs.readFile(`./data/${fileName}`, 'utf-8');
            return data.split('\n').filter(line => line.trim() !== '');
        } catch (e) {
            console.error(e.message);
            return [];
        }
    };

    static async readWalletsData (source) {
        try {
            if (source === 'mnemo') {
                const mnemonics = await this.readRawData('mnemonics.txt');
                if (mnemonics.length === 0) throw new Error('Empty mnemonics.txt');
                return { type: 'mnemonic', data: mnemonics.filter(line => line.trim() !== '') };
            } else if (source === 'pk') {
                const privateKeys = await this.readRawData('privateKeys.txt');
                if (privateKeys.length === 0) throw new Error('Empty privateKeys.txt');
                return { type: 'privateKey', data: privateKeys.filter(line => line.trim() !== '') };
            } else {
                throw new Error('Invalid source. Source must be either "mnemo" or "pk".');
            }
        } catch (e) {
            console.error(e.message);
            throw e;
        }
    };
};
