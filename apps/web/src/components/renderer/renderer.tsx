import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { memo } from "react";

import { classNames, sanitizeHtml } from "../../utilities";

const TwitterEmbed = dynamic(
  () => import("../embeds").then((i) => i.TwitterEmbed),
  { ssr: false }
);

const TelegramEmbed = dynamic(
  () => import("../embeds").then((i) => i.TelegramEmbed),
  { ssr: false }
);

type Props = {
  isSummary?: boolean;
  children: OutputData;
};

export const Renderer = memo<Props>(({ isSummary = false, children }) => {
  if (!Array.isArray(children.blocks)) {
    return null;
  }

  if (isSummary) {
    return (
      <div className="content">
        {renderBlock(children.blocks[0], isSummary)}
      </div>
    );
  }

  return (
    <div className="content flex flex-col gap-y-3">
      {children.blocks.map((block) => renderBlock(block, isSummary))}
    </div>
  );
});

function renderBlock(block: OutputBlockData, isSummary: boolean) {
  if (!block) {
    return null;
  }

  console.log(block);

  if (block.type === "header") {
    return <h2 key={block.id}>{block.data.text}</h2>;
  }

  if (block.type === "paragraph") {
    const __html = sanitizeHtml(block.data.text, isSummary);
    return <p key={block.id} dangerouslySetInnerHTML={{ __html }} />;
  }

  if (block.type === "image") {
    return (
      <div className="cdx-block cdx-simple-image">
        <div
          className={classNames("cdx-simple-image__picture", {
            "cdx-simple-image__picture--with-border": block.data.withBorder,
            "cdx-simple-image__picture--stretched -mx-4": block.data.stretched,
            "cdx-simple-image__picture--with-background":
              block.data.withBackground,
          })}
        >
          <img
            className={classNames("h-full", {
              "!rounded-none": block.data.stretched,
            })}
            src={block.data.url}
            alt={block.data.caption}
          />
        </div>
        {block.data.caption && (
          <div className="cdx-input cdx-simple-image__caption">
            {block.data.caption}
          </div>
        )}
      </div>
    );
    {
      /* return <img key={block.id} alt={block.data.caption} src={block.data.url} />; */
    }
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
}

Renderer.displayName = "Renderer";
