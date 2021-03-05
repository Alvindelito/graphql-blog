import styled from 'styled-components';
import convertDate from '../lib/convertDate';

const PostStyle = styled.div`
  margin: 25px auto;
  border: 1px solid black;
  width: 700px;
`;

const TitleStyle = styled.h2`
  font-weight: bold;
  font-size: 3rem;
  margin: 8px;
`;

const ContentStyle = styled.p`
  margin: 8px;
`;

export default function Post({ post }) {
  return (
    <PostStyle>
      <TitleStyle>{post.title}</TitleStyle>
      <ContentStyle>{post.content}</ContentStyle>
      <ContentStyle>Created at {convertDate(post.createdAt)}</ContentStyle>
    </PostStyle>
  );
}
