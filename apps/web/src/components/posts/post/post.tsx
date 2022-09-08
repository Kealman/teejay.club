import { TPost } from "@teejay/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment } from "react";

import { classNames } from "../../../utilities";
import { Card } from "../../card";
import { Markdown } from "../../markdown";
import { PostVote } from "../post-vote";

const RelativeDate = dynamic(
  () => import("../../relative-date").then((index) => index.RelativeDate),
  { ssr: false }
);

type Props = JSX.IntrinsicElements["div"] & {
  post: TPost;
  isPreview?: boolean;
};

export const Post: FC<Props> = ({
  post,
  isPreview = false,
  className,
  ...props
}) => {
  return (
    <Card
      className={classNames(
        "relative flex flex-col w-full md:max-w-2xl",
        className
      )}
      {...props}
    >
      {post.isPinned && (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 p-1 bg-white shadow rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </div>
      )}
      <div className="flex flex-row items-center justify-between text-sm">
        <div className="flex flex-row items-center gap-x-4">
          {post.subsite && (
            <Link href={`/subsites/${post.subsite.slug}`}>
              <a className="flex flex-row gap-x-2 items-center">
                <Image
                  className="h-6 w-6 rounded"
                  width={24}
                  height={24}
                  alt={post.subsite.name}
                  src={post.subsite.avatar}
                />
                <div className="font-medium text-sm">{post.subsite.name}</div>
              </a>
            </Link>
          )}
          <div className="flex flex-row gap-x-2 items-center">
            {!post.subsite && (
              <Image
                className="h-6 w-6 rounded"
                alt={post.author.name}
                src={post.author.avatar}
                width={24}
                height={24}
              />
            )}
            <a
              href={`/users/${post.author.id}`}
              className={classNames("text-sm", {
                "font-medium": !post.subsite,
              })}
            >
              {post.author.name}
            </a>
          </div>
          {post.author.isVerified && (
            <svg
              className="ml-1 w-4 h-4 fill-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="text-gray-600">
          <RelativeDate date={new Date(post.createdAt)} />
        </div>
      </div>
      {isPreview ? (
        <Link href={`/posts/${post.id}`}>
          <a>
            <div className="font-bold text-xl mt-3">{post.title}</div>
            <Markdown isSummary>{post.content}</Markdown>
          </a>
        </Link>
      ) : (
        <Fragment>
          <div className="font-bold text-xl mt-3">{post.title}</div>
          <Markdown>{post.content}</Markdown>
        </Fragment>
      )}
      <div className="mt-3 flex flex-row gap-x-2 text-gray-900 fill-gray-900 text-sm">
        <a
          href={`/posts/${post.id}#comments`}
          className="flex flex-row items-center gap-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
          <div className="font-medium">{post?._count?.comments}</div>
        </a>
        <PostVote post={post} />
      </div>
    </Card>
  );
};
