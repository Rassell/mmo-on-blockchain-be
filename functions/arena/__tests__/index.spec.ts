import { Request, Response } from '@google-cloud/functions-framework';

import { helloHttp } from '../index';

describe('init', () => {
  const mockRequest = jest.fn<Request, []>();
  const mockResponse = jest.fn<Response, []>(() => ({
    send: jest.fn(),
    
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a string', () => {
    const req = new mockRequest();
    const res = new mockResponse();

    helloHttp(req, res);

    expect(res.send).toHaveBeenCalledWith('Hello World!');
  });
});
