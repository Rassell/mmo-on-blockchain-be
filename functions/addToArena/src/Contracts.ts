if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

import { createAlchemyWeb3 } from '@alch/alchemy-web3';

import { roster } from '../assets';

const rosterContractAddress = '0xF9A2068390403bA796F5cDe72C5b99ba82AFb51e';
export const web3 = createAlchemyWeb3(process.env.ALCHEMY_KEY);
const rosterContract = new web3.eth.Contract(
  roster.abi as any,
  rosterContractAddress,
);

export async function getUserRoster(address: string): Promise<any[]> {
  try {
    const result = await rosterContract.methods
      .getRosterByAddress(address)
      .call();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
