jest.mock('../src/ArenaLogic', () => ({
  assignUserToArena: jest.fn(() => ({ id: 'id', success: true })),
}));

import { Request, Response } from '@google-cloud/functions-framework';

import { addToArena } from '../src/index';

describe('Index http', () => {
  const mockRequest = jest.fn<Request, []>();
  const mockResponse = jest.fn<Response, []>(
    () =>
      ({
        send: jest.fn(),
        status: jest.fn(),
      } as any),
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an id of the assigned arena', async () => {
    const req = new mockRequest();
    const res = new mockResponse();

    req.body = { address: '0x123', championId: '1' };

    await addToArena(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should return bad request if the req body is empty', async () => {
    const req = new mockRequest();
    const res = new mockResponse();

    req.body = {};

    await addToArena(req, res);

    expect(res.send).toHaveBeenCalledWith('Bad request');
  });
});
