import { Request, Response } from '@google-cloud/functions-framework';

export function helloHttp(req: Request, res: Response) {
  res.send('Hello World!');
}
