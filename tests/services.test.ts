import { services } from '../src/services';
import { encrypt, decrypt } from '../src/utils';
import { db } from '../src/db';
import { historyTable } from '../src/db/schemas';
import { jest } from '@jest/globals';

jest.mock('../src/utils', () => ({
  encrypt: jest.fn(),
  decrypt: jest.fn()
}));

jest.mock('../src/db', () => {
  const mockValues = jest.fn(() => ({ values: jest.fn() }));
  const mockInsert = jest.fn(() => ({ values: mockValues }));
  const mockFrom = jest.fn(() => [
        {
          id: 1,
          email: 'user1@example.com',
          password: 'p1',
          timestamp: '2025-05-18T12:00:00Z',
          encrypted: 'e1'
        }
      ]);
  const mockSelect = jest.fn(() => ({ from: mockFrom }));

  return {
    db: {
      insert: mockInsert,
      select: mockSelect
    },
    __mocks__: { mockInsert, mockValues, mockFrom, mockSelect }
  };
});

jest.mock('../src/db/schemas', () => ({
  historyTable: {}
}));

describe('services', () => {
  const mockEncrypt = encrypt as jest.MockedFunction<typeof encrypt>;
  const mockDecrypt = decrypt as jest.MockedFunction<typeof decrypt>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should encrypt data, insert into DB and return encrypted value', async () => {
      const email = 'user@example.com';
      const password = 'password123';
      const mockEncrypted = 'encrypted-token';

      mockEncrypt.mockResolvedValue(mockEncrypted);
      const result = await services.login(email, password);

      expect(encrypt).toHaveBeenCalledWith(expect.objectContaining({ email, password }));
      expect(db.insert).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toBe(mockEncrypted);
    });
  });

  describe('decrypt', () => {
    it('should decrypt the encrypted string', async () => {
      const encrypted = 'encrypted-token';
      const decrypted = { email: 'user@example.com', password: 'pass', timestamp: '...' };

      mockDecrypt.mockResolvedValue(decrypted);
      const result = await services.decrypt(encrypted);

      expect(decrypt).toHaveBeenCalledWith(encrypted);
      expect(result).toBe(decrypted);
    });
  });

  describe('history', () => {
    it('should return records from the DB', async () => {
      const records = [
        {
          id: 1,
          email: 'user1@example.com',
          password: 'p1',
          timestamp: '2025-05-18T12:00:00Z',
          encrypted: 'e1'
        }
      ];

      const result = await services.history();

      expect(db.select).toHaveBeenCalled();
      expect(db.select().from).toHaveBeenCalledWith(historyTable);
      expect(result).toStrictEqual(records);
    });
  });
});
