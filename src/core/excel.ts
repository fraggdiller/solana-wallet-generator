import Excel from 'exceljs';
import { SolanaWallet } from '../other/types';

export async function createExcelFile(data: SolanaWallet[]): Promise<void> {
    const workbook: Excel.Workbook = new Excel.Workbook();
    const worksheet: Excel.Worksheet = workbook.addWorksheet('Data');

    const includeMnemonic: boolean = data.some((item: SolanaWallet): boolean => item.mnemonic !== undefined);

    worksheet.columns = [
        ...includeMnemonic ? [{ header: 'Mnemonic', key: 'mnemonic', width: 32 }] : [],
        { header: 'Private Key', key: 'privateKey', width: 32 },
        { header: 'Address', key: 'address', width: 32 },
    ];

    data.forEach((item: SolanaWallet): void => {
        const row: Partial<SolanaWallet> = {
            privateKey: item.privateKey,
            address: item.address,
        };
        if (includeMnemonic) {
            row.mnemonic = item.mnemonic;
        }
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile('./data/solana-wallets.xlsx');
}
