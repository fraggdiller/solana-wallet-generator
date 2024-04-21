import { SolanaWallet } from './other/types';
import Wallet from './core/wallet';
import Filehandler from './other/filehandler';
import { createExcelFile } from './core/excel';


async function main (): Promise<void> {

    const args: string[] = process.argv.slice(3);

    let wallets: SolanaWallet[];

    switch (args[0]) {
        case 'generate':
            wallets = Wallet.generateWallet(parseInt(args[1]));
            break;
        case 'get':
            if (args[1] === 'mnemo') {
                const mnemonics: string[] = await Filehandler.loadFile('./data/mnemonics.txt');
                wallets = Wallet.getWalletFromMnemonic(mnemonics);
            } else if (args[1] === 'pk') {
                const privateKeys: string[] = await Filehandler.loadFile('./data/privateKeys.txt');
                wallets = Wallet.getWalletFromPrivateKey(privateKeys);
            } else {
                throw new Error('Invalid args. use npm start generate N or npm start get mnemo / pk')
            }
            break;
        default:
            throw new Error('Invalid args. use npm start generate N or npm start get mnemo / pk');
    }

    await createExcelFile(wallets);
}

await main();