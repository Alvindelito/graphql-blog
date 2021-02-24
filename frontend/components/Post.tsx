import styled from 'styled-components';
import convertDate from '../lib/convertDate';

const PostStyle = styled.div`
  margin: 50px auto;
  border: 1px solid black;
  width: 700px;
`;

const TitleStyle = styled.h2`
  font-weight: bold;
  font-size: 3rem;
  margin: 8px;
`;

export default function Post({ post }) {
  return (
    <PostStyle>
      <TitleStyle>{post.title}</TitleStyle>
      <p>{post.content}</p>
      <p>Created at {convertDate(post.createdAt)}</p>
    </PostStyle>
  );
}
