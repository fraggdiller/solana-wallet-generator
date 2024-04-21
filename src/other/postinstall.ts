import Filehandler from './filehandler';

async function postinstall (): Promise<void> {
    await Filehandler.mkDir('./data');
    await Filehandler.createFile('./data/mnemonics.txt', 'word1 ... word12');
    await Filehandler.createFile('./data/privateKeys.txt', 'privateKey');
}

await postinstall();