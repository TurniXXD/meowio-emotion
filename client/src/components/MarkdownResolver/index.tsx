import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const MarkdownResolverWrapper = styled.div`
  p {
    word-wrap: break-word;
    font-size: 16px !important;
  }

  .text-left p {
    text-align: left !important;
  }

  ul {
    list-style: inside;
  }

  ol {
    list-style: decimal;
  }

  li {
    margin-left: 0.6rem;
  }

  ol li {
    margin-left: 1.6rem;
  }

  a {
    text-decoration: underline;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0.75rem;
  }
`;

export const MarkdownResolver = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  // external link resolver
  if (/\(http(.*?)\)/.test(text) && text !== null) {
    const linksRaw: Array<string> = [];
    let iWhile = 0;

    while (/\(http(.*?)\)/.test(text)) {
      const matchedLink = text.match(/\[(.*?)\]+\(http(.*?)\)/);
      let matchedLinkNotNull;
      matchedLink !== null && (matchedLinkNotNull = matchedLink[0]);
      text !== null && linksRaw.push(matchedLinkNotNull || '');
      text = text.replace(/\[(.*?)\]+\(http(.*?)\)/, `<<${iWhile}>>`);
      iWhile++;
    }

    linksRaw.forEach((linkRaw, i) => {
      const linkHref = linkRaw?.split(/\(/)[1].split(/\)/)[0];
      const linkText = linkRaw?.split(/\[/)[1].split(/\]/)[0];
      text = text.replace(
        `<<${i}>>`,
        ` <a href="${linkHref}" target="_blank">${linkText}</a>`
      );
    });
  }

  return (
    <MarkdownResolverWrapper className={className}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{text || ''}</ReactMarkdown>
    </MarkdownResolverWrapper>
  );
};
