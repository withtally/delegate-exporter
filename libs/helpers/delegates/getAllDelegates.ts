import { getDelegates } from "./getDelegates";

export const getAllDelegates = async (afterCursor?: string) => {
  const delegates = [];

  try {
    let afterCursor: string | undefined;

    do {
      const { nodes, lastCursor } = await getDelegates(afterCursor);
      delegates.push(...nodes);

      afterCursor = lastCursor;
    } while (afterCursor && afterCursor.length > 0 && delegates.length < 900);

    return delegates;
  } catch (error) {
    console.log((error as Error).message);
    throw new Error('can\'t fetch delegates' )
  }
};
