export const getDelegatesQuery = `
  query Delegates($input: DelegatesInput!) {
    delegates(input: $input) {
      nodes {
        ... on Delegate {
          id
          account {
            address
            bio
            name
            picture
            twitter
            ens
          }
          votesCount
          delegatorsCount
          statement {
            statement
            statementSummary
            seekingDelegations
            isSeekingDelegation
            issues {
              id
              organizationId
              name
              description
            }
          }
        }
      }
      pageInfo {
        firstCursor
        lastCursor
      }
    }
  }
`;
