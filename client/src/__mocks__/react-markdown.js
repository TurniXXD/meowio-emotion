// Workaround for this bug
// https://github.com/remarkjs/react-markdown/issues/635

jest.mock('react-markdown', () => (props) => {
  return <>{props.children}</>;
});

jest.mock('rehype-raw', () => (props) => {
  return <>{props.children}</>;
});
