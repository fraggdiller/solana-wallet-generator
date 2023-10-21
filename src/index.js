import FileHandler from './utils/fileHandler.js';
import Generator from './utils/generator.js';
import SolanaWallet from './utils/wallet.js';


const initialize = async () => {
    await FileHandler.initializeFiles();
};

const generateWallet = async (arg1) => {
    if (arg1 <= 0) throw new Error('arg1 must be > 0');
    const generator = new Generator();
    const wallets = await generator.generateWallet(arg1);
    await FileHandler.saveWalletsData(wallets);
    console.log('Wallets successfully generated and saved to files.');
};

const getWallet = async (arg2) => {
    if (arg2 !== 'pk' && arg2 !== 'mnemo') throw new Error('arg2 must be "pk" or "mnemo"');
    const walletsData = await FileHandler.readWalletsData(arg2);
    const extractor = new SolanaWallet();
    if (arg2 === 'mnemo' && walletsData.type === 'mnemonic') {
        const wallets = await Promise.all(walletsData.data.map(mnemonic => extractor.fromMnemonic(mnemonic)));
        await FileHandler.saveWalletsData(wallets, false, true, true);
        console.log('Wallet data successfully saved to files.');
    } else if (arg2 === 'pk' && walletsData.type === 'privateKey') {
        const addresses = await Promise.all(walletsData.data.map(privateKey => extractor.fromPrivateKey(privateKey)));
        const wallets = addresses.map(address => ({ publicKey: address }));
        await FileHandler.saveWalletsData(wallets, false, false, true);
        console.log('Wallet addresses successfully saved to file.');
    } else {
        throw new Error('Mismatched source and data type. Please specify the correct source.');
    }
};

const args = process.argv.slice(2);
if (args[0] === 'generate' && args[1]) {
    initialize()
        .then(() => generateWallet(Number(args[1])))
        .catch(console.error);
} else if (args[0] === 'data' && args[1]) {
    initialize()
        .then(() => getWallet(args[1]))
        .catch(console.error);
} else {
    console.error('Invalid command or arguments');
}
