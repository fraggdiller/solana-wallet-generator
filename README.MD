[![Typing SVG](https://readme-typing-svg.demolab.com?font=Raleway&weight=500&size=50&duration=3000&pause=1000&color=20F700&center=true&vCenter=true&width=640&height=90&lines=Solana+Wallet+Generator)](https://git.io/typing-svg)

# Solana wallets generator

This code will allow you to generate a specified number of Solana wallets and save them to files.

## Install dependencies

You can install it using:
```
npm i
```

## Wallet generator

To generate wallets you can run the following command in terminal
```
npm run generate 10
```

It runs wallet generator and saves generated data in `./data/mnemonics.txt`, `./data/privateKeys.txt`, `./data/addresses.txt`

## Getting data of pregenerated wallets
You can get all wallet data from mnemonics and private keys. You should load your mnemonics to `./data/mnemonics.txt` or `./data/privateKeys.txt` and run
```
npm run data mnemo
```
or
```
npm run data pk
```


## Saving to files

Generated wallets are saved in several files:

- addresses.txt: a text file (.txt) containing a list of addresses.
- privateKeys.txt: a text file (.txt) containing a list of private keys.
- mnemonics: a text file (.txt) containing a list of mnemonics.

## Deploying wallets


## Conclusion
```
git clone https://github.com/fraggdiller/solana-wallet-generator.git
cd solana-wallet-generator
npm i
npm run generate 10
npm run data mnemo
```

### Support / Qs

`Telegram:` https://t.me/retrodropTools | https://t.me/fraggdiller