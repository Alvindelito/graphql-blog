import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Post from './Post';

export const GET_ALL_POSTS = gql`
  query GET_ALL_POSTS {
    getAllPosts {
      id
      title
      content
      authorId
      author {
        name
      }
      createdAt
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data?.getAllPosts.map((post: any) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
