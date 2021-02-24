import styled from 'styled-components';

const PostStyles = styled.div`
  margin: 50px auto;
`;

export default function Post({ post }) {
  return (
    <PostStyles>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>posted by: {post.author.name}</p>
    </PostStyles>
  );
}
