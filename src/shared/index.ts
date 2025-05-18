import { CryptoKey } from 'jose';

const shared: Record<string, CryptoKey> = {};

export const getShared = (key: string) => shared[key];
export const setShared = (key: string, value: CryptoKey) => {
  shared[key] = value;
};
