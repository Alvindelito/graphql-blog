import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    /* add variables here for colors */
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    text-decoration: none;
    color: black; /* replace with variable */
  }
  a:hover {
    text-decoration: underline;
  }
`;

const InnerStyles = styled.div`
  max-width: 1000px; /* change to variable */
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <InnerStyles>{ children }</InnerStyles>
    </div>
  )
}