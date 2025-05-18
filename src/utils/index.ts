import { compactDecrypt, CompactEncrypt, importPKCS8, importSPKI } from 'jose';
import { readFile } from 'fs/promises';
import { setShared, getShared } from '../shared';

export const loadKeys = async () => {
  const rpriv = await readFile(process.env.PRIVATE_KEY_FILE!, 'utf-8');
  const rpub = await readFile(process.env.PUBLIC_KEY_FILE!, 'utf-8');

  const privKey = await importPKCS8(rpriv, process.env.ALGORITHM!);

  const pubKey = await importSPKI(rpub, process.env.ALGORITHM!);

  setShared('privateKey', privKey);
  setShared('publicKey', pubKey);
};

export const encrypt = async (data: object) => {
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const encrypted = await new CompactEncrypt(encoded)
    .setProtectedHeader({
      alg: process.env.ALGORITHM!,
      enc: process.env.ENCRYPT_ALGORITHM!
    })
    .encrypt(getShared('publicKey'));
  return encrypted;
};

export const decrypt = async (encrypted: string) => {
  const { plaintext } = await compactDecrypt(encrypted, getShared('privateKey'));
  return JSON.parse(new TextDecoder().decode(plaintext));
};
