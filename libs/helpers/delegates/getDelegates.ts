import axios from "axios";
import { getDelegatesQuery } from "../../querys/delegates";
import { getIsSeekingDelegations } from "./getIsSeekingDelegations";

export const getDelegates = async (afterCursor?: string) => {
  const isSeekingDelegation = getIsSeekingDelegations();

  const params = {
    query: getDelegatesQuery,
    variables: {
      input: {
        filters: {
          // governorId: process.env.GOVERNOR_ID,
          organizationId: process.env.ORGANIZATION_ID,
          isSeekingDelegation: isSeekingDelegation,
        },
        sort: { isDescending: true, sortBy: "votes" },
        page: {
          limit: 20,
          afterCursor,
        },
      },
    },
  };

  const config = {
    headers: {
      "Api-key": process.env.TALLY_API_KEY,
    },
  };

  const response = await axios.post(
    process.env.API_ENDPOINT as string,
    params,
    config
  );

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 200);
  });

  return {
    nodes: response.data.data.delegates.nodes,
    lastCursor: response.data.data.delegates.pageInfo.lastCursor,
  };
};
