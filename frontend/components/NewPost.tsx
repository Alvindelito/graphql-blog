import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import useForm from '../components/hooks/useForm';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($title: String!, $content: String!) {
    createPost(title: $title, content: $content)
  }
`;

export default function NewPost() {
  const router = useRouter();
  const { inputs, handleChange, clearForm }: any = useForm({
    title: '',
    content: '',
  });

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      title: inputs.title,
      content: inputs.content,
    },
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await createPost();
    if (res && res.data) {
      router.push('/');
    }
  }

  if (error) {
    console.error(error);
  }

  if (loading) {
    <p>making new post</p>;
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>New Post</h2>
      <label htmlFor="title">
        Title:
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </label>
      <label htmlFor="content">
        Body:
        <input
          type="textarea"
          name="content"
          value={inputs.content}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Post</button>
    </form>
  );
}
