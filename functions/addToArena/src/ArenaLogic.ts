import { arenaCollection } from './Firebase';
import { getUserRoster } from './Contracts';

export async function assignUserToArena(user: string, championId: number) {
  let success = true;
  let id = '';

  try {
    const roster = await getUserRoster(user);
    if (roster.includes(championId)) {
      const addArenaResponse = await arenaCollection.add({
        name: 'Arena 1',
        players: [
          {
            address: user,
            championId: championId,
          },
        ],
      });
      id = addArenaResponse.id;
    } else {
      success = false;
    }
  } catch (error) {
    console.log(error);
    success = false;
  }

  return { success, id };
}
