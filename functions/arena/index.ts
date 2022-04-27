if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

import { Request, Response } from '@google-cloud/functions-framework';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

import { championFactory, roster } from './assets';

const rosterContractAddress = '0xC431f0678aDec03906dD0f688102653cbbE77259';
const championContractAddress = '0x885cbD739bf5A87CEb7eCF3dfa7193c4628974a6';

const web3 = createAlchemyWeb3(process.env.ALCHEMY_KEY);
const rosterContract = new web3.eth.Contract(
  roster.abi as any,
  rosterContractAddress,
);
const championContract = new web3.eth.Contract(
  championFactory.abi as any,
  championContractAddress,
);

export async function helloHttp(req: Request, res: Response) {
  const response = await web3.eth.getBalance(
    '0xd5a604Cf08a18E5d811499B3EB1908172386e51e',
  );

  res.send(response);
}
