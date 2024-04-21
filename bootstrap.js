import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
register('ts-node/esm', pathToFileURL(`${__dirname}/`));

import(process.argv[2]).catch(err => {
    console.error('\x1b[31m%s\x1b[0m', err);
});
