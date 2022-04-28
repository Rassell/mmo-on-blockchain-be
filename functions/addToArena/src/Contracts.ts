import { createAlchemyWeb3 } from '@alch/alchemy-web3';

import { roster } from '../assets';

const rosterContractAddress = '0xC431f0678aDec03906dD0f688102653cbbE77259';

export const web3 = createAlchemyWeb3(process.env.ALCHEMY_KEY);
const rosterContract = new web3.eth.Contract(
  roster.abi as any,
  rosterContractAddress,
);

export async function getUserRoster(address: string): Promise<any[]> {
  try {    
    return await rosterContract.methods.getUserRoster(address).call();
  } catch (error) {
    console.error(error);
    return [];
  }
}
