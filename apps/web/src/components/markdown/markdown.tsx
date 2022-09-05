import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Content, Root } from "mdast";
import type { Plugin } from "unified";

type Props = {
  isSummary?: boolean;
  children: string;
};

export const Markdown = memo<Props>(function Markdown({
  isSummary = false,
  children,
}) {
  const plugins = useMemo(() => {
    const plugins = [remarkGfm];
    if (isSummary) {
      plugins.push(remarkSummary);
    }
    return plugins;
  }, [isSummary]);

  return (
    <ReactMarkdown
      className="mt-2 flex flex-col gap-y-3 content"
      remarkPlugins={plugins}
      components={{
        a: (props) => {
          if (isSummary) {
            return <span>{props.children}</span>;
          }
          try {
            const url = new URL(props.href ?? "");
            if (url.hostname === "teejay.club") {
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              return <a {...props} />;
            }
          } catch (error) {
            console.error(error);
          }
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          return <a {...props} target="_blank" />;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
});

const remarkSummary: Plugin<[], Root> = () => (tree) => {
  const children: Content[] = [];

  const paragraph = tree.children[0];

  if (paragraph?.type !== "paragraph") {
    return { ...tree, children };
  }

  const imageCount = paragraph.children.filter(
    (c) => c.type === "image"
  ).length;

  if (imageCount <= 1) {
    children.push(paragraph);
  }

  if (!imageCount) {
    const paragraph = tree.children[1];

    if (paragraph?.type !== "paragraph") {
      return { ...tree, children };
    }

    const imageCount = paragraph.children.filter(
      (c) => c.type === "image"
    ).length;

    if (imageCount === 1) {
      children.push(paragraph);
    }
  }

  return { ...tree, children };
};
