import axios from "axios";
import { getDelegatesQuery } from "../../querys/delegates";

export const getDelegates = async (afterCursor?: string) => {
  const params = {
    query: getDelegatesQuery,
    variables: {
      input: {
        filters: {
          governorId: process.env.GOVERNOR_ID,
          organizationId: process.env.ORGANIZATION_ID,
          isSeekingDelegation: true,
        },
        sort: {
          isDescending: true,
          sortBy: "VOTES",
        },
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

  const response = await axios.post(process.env.API_ENDPOINT as string, params, config);
  
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 200);
  });

  return {
    nodes: response.data.data.delegates.nodes,
    lastCursor: response.data.data.delegates.pageInfo.lastCursor,
  };
};
