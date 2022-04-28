if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

import { Request, Response } from '@google-cloud/functions-framework';

import { assignUserToArena } from './ArenaLogic';

export async function addToArena(req: Request, res: Response) {
  if (!req.body.address && !req.body.championId) {
    res.status(400);
    res.send('Bad request');
  } else {
    const { success, id } = await assignUserToArena(
      req.body.address,
      req.body.championId,
    );
    if (!success) res.status(500).send('Internal server error');
    else res.send({ id });
  }
}
