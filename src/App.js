import { gql, useQuery } from '@apollo/client';

const profileQuery = gql`
  query($first: Int!) {
    viewer {
      login
      avatarUrl
      company
      repositories(first: $first) {
        nodes {
          name
          createdAt
          defaultBranchRef {
            name
          }
        }
      }
    }
  }
`;

export default function App() {
  const limit = parseInt(window.location.search.replace('?limit=', ''));
  const { loading, error, data } = useQuery(profileQuery, {
    variables: { first: limit ?? 5 },
  });

  if (loading) return 'Loading ...';
  if (error) return 'Something went wrong!';

  return (
    <>
      <img src={data.viewer.avatarUrl} height="200" alt="Profile" />
      <p>{data.viewer.company}</p>
      <ul>
        {data.viewer.repositories.nodes.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </>
  );
}
