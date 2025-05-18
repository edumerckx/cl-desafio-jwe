import { controller } from '../src/controllers';
import { Request, Response } from 'express';
import { services } from '../src/services';
import { jest } from '@jest/globals';

jest.mock('../src/services', () => ({
  services: {
    login: jest.fn(),
    decrypt: jest.fn(),
    history: jest.fn()
  }
}));

describe('controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;

  const mockLogin = services.login as jest.MockedFunction<typeof services.login>;
  const mockDecrypt = services.decrypt as jest.MockedFunction<typeof services.decrypt>;
  const mockHistory = services.history as jest.MockedFunction<typeof services.history>;

  const createMockResponse = (): Partial<Response> => {
    return {
      json: jest.fn() as unknown as Response['json']
    };
  };

  beforeEach(() => {
    res = createMockResponse();
    jsonMock = res.json as jest.Mock;
  });

  describe('login', () => {
    it('should call services.login and return encrypted value', async () => {
      const email = 'user@example.com';
      const password = 'password123';
      const encrypted = 'encrypted-token';

      mockLogin.mockResolvedValue(encrypted);

      req = {
        body: { email, password }
      };

      await controller.login(req as Request, res as Response);

      expect(services.login).toHaveBeenCalledWith(email, password);
      expect(jsonMock).toHaveBeenCalledWith({ encrypted });
    });
  });

  describe('jwe', () => {
    it('should call services.decrypt and return data', async () => {
      const encrypted = 'encrypted-token';
      const decryptedData = { id: 1, email: 'user@example.com' };

      mockDecrypt.mockResolvedValue(decryptedData);

      req = {
        body: { encrypted }
      };

      await controller.jwe(req as Request, res as Response);

      expect(services.decrypt).toHaveBeenCalledWith(encrypted);
      expect(jsonMock).toHaveBeenCalledWith(decryptedData);
    });
  });

  describe('history', () => {
    it('should call services.history and return records', async () => {
      const records = [
        {
          id: 1,
          email: 'user@example.com',
          password: 'password123',
          timestamp: '2022-01-01T00:00:00.000Z',
          encrypted: 'encrypted-token'
        }
      ];

      mockHistory.mockResolvedValue(records);

      req = {};

      await controller.history(req as Request, res as Response);

      expect(services.history).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({ records });
    });
  });
});
