import { encrypt, decrypt } from '../utils';
import { db } from '../db';
import { historyTable } from '../db/schemas';

export const services = {
  login: async (email: string, password: string) => {
    const timestamp = new Date().toISOString();
    const data = { email, password, timestamp };
    const encrypted = await encrypt(data);

    await db.insert(historyTable).values({
      email,
      password,
      timestamp,
      encrypted
    });

    return encrypted;
  },
  decrypt: async (encrypted: string) => {
    const data = await decrypt(encrypted);
    return data;
  },
  history: async () => {
    const data = await db.select().from(historyTable);
    return data;
  }
};
