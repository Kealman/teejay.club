import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { createElement, memo } from "react";

import { sanitizeHtml } from "../../utilities";

const TwitterEmbed = dynamic(
  () => import("../embeds").then((i) => i.TwitterEmbed),
  { ssr: false }
);

const TelegramEmbed = dynamic(
  () => import("../embeds").then((i) => i.TelegramEmbed),
  { ssr: false }
);

type Props = {
  children: OutputData;
};

export const Renderer = memo<Props>(({ children }) => {
  if (!Array.isArray(children.blocks)) {
    return null;
  }

  return (
    <div className="content flex flex-col gap-y-3">
      {children.blocks.map((block) => {
        if (block.type === "paragraph") {
          return (
            <p
              key={block.id}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(block.data.text),
              }}
            />
          );
        }

        if (block.type === "header") {
          return <h2 key={block.id}>{block.data.text}</h2>;
        }

        if (block.type === "list") {
          const Tag = block.data.style === "ordered" ? "ol" : "ul";
          return (
            <Tag key={block.id}>
              {/* @ts-ignore */}
              {block.data.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </Tag>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={block.id}>
              <p className="not-italic">{block.data.text}</p>
              <p className="text-small">— {block.data.caption}</p>
            </blockquote>
          );
        }

        if (block.type === "delimiter") {
          return <div key={block.id} className="ce-delimiter"></div>;
        }

        if (block.type === "twitter") {
          return <TwitterEmbed key={block.id} id={block.data.id} />;
        }

        if (block.type === "telegram") {
          return <TelegramEmbed key={block.id} id={block.data.id} />;
        }

        return null;
      })}
    </div>
  );
});

Renderer.displayName = "Renderer";
