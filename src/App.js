import { gql, useQuery } from '@apollo/client';

const profileQuery = gql`
  query {
    viewer {
      login
      avatarUrl
      company
      repositories(first: 5) {
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
  const { loading, error, data } = useQuery(profileQuery);
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
