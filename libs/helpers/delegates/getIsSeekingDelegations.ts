export const getIsSeekingDelegations = () => {
  switch (process.env.IS_SEEKING_DELEGATION) {
    case 'true':
      return true;
    case 'false':
      return false
    default:
      return undefined;
  }
}