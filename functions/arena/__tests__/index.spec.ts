import { Request, Response } from '@google-cloud/functions-framework';

import { helloHttp } from '../index';

describe('addChampionToArena', () => {
  const mockRequest = jest.fn<Request, []>();
  const mockResponse = jest.fn<Response, []>(() => ({
    send: jest.fn(),
  } as any));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an id', async () => {
    const req = new mockRequest();
    const res = new mockResponse();

    await helloHttp(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.any(String));
  });
});
