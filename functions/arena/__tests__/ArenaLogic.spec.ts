jest.mock('../src/Firebase', () => ({
  arenaCollection: { add: jest.fn(() => ({ id: 'id' })) },
}));
jest.mock('../src/Contracts', () => ({
  getUserRoster: jest.fn(() => [1]),
}));

import { assignUserToArena } from '../src/ArenaLogic';

describe('Arena Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return success and the id if happy flow', async () => {
    const response = await assignUserToArena('0x123', 1);

    expect(response).toEqual({ id: 'id', success: true });
  });

  it('should return false if the user or champion already is on a arena', async () => {
    const response = await assignUserToArena('0x123', 1);

    expect(response).toEqual({ id: 'id', success: false });
  });

  it('should return false if the arena is not finished', async () => {
    const response = await assignUserToArena('0x123', 1);

    expect(response).toEqual({ id: 'id', success: false });
  });
});
