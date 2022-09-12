import { TComment } from "@teejay/api";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { classNames, initVanillaTRPC } from "../../../utilities";
import { Link } from "../../link";
import { CommentVote } from "../comment-vote";
import CommentsState from "../comments/comments.state";
import { NewCommentForm } from "../new-comment-form";

const RelativeDate = dynamic(
  () => import("../../relative-date").then((index) => index.RelativeDate),
  { ssr: false }
);

type Props = {
  comment: TComment;
  postId: number;
  state: CommentsState;
  level: number;
  parentChilds: number[];
  parentIds: number[];
  childIndex?: number;
  onReply: () => void;
};

export const Comment = observer<Props>(
  ({
    comment: _comment,
    postId,
    state,
    level,
    parentChilds,
    parentIds,
    childIndex = 0,
    onReply,
  }) => {
    const router = useRouter();
    const url = new URL(router.asPath, "http://teejay.club");
    const [comment, setComment] = useState<TComment>(_comment);
    const trpc = initVanillaTRPC();

    const handleMoreCommentsClick = () => {
      if (state.isChildHidden(comment.id)) {
        state.toggleShowChilds(comment.id);
      } else {
        loadReplies();
      }
    };

    const loadReplies = () => {
      trpc.comments.getOne.query({ id: comment.id }).then((com) => {
        setComment(com.data[0]);
      });
    };

    const handleReply = () => {
      onReply();
      loadReplies();
      handleCancelReply();
      if (state.isChildHidden(comment.id)) {
        state.toggleShowChilds(comment.id);
      }
    };

    const handleClickReplyButton = () => {
      state.handleClickReplyButton(comment.id);
    };

    const handleCancelReply = () => {
      state.handleClickReplyButton(0);
    };

    const handleBranchClick = (parentId: number) => {
      state.toggleShowChilds(parentId);
    };

    return (
      <>
        <div className="flex flex-row">
          <div
            className={classNames({
              "flex justify-end": true,
            })}
            style={{ width: 19 * level }}
          >
            {level > 0 &&
              [...Array(level)].map((_, lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleBranchClick(parentIds[lvl])}
                  className={classNames({
                    "flex w-5": true,
                    "border-l  before:-ml-px":
                      parentChilds[lvl] > 1 &&
                      (lvl !== level - 1 || childIndex < parentChilds[lvl] - 1),
                    "before:rounded-bl-lg before:border-l before:border-b before:w-3 before:h-7":
                      lvl === level - 1,
                  })}
                ></button>
              ))}
          </div>
          <div className="flex-col" style={{ width: "100%" }}>
            <div
              id={`comments/${comment.id}`}
              className="relative -top-14 invisible"
            ></div>
            <div
              className={classNames({
                "flex flex-col gap-y-2 -mx-4 px-4 py-2 transition-colors duration-300":
                  true,
                "bg-amber-100": url.hash === `#comments/${comment.id}`,
              })}
            >
              <div className="flex flex-row items-center">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    layout="fill"
                    alt={comment.author.name}
                    src="/avatar.webp"
                  />
                </div>
                <div className="ml-2 flex flex-col">
                  <div className="flex flex-row items-center">
                    <Link href={`/users/${comment.author.id}`}>
                      <a>
                        <div className="text-sm leading-5 font-medium">
                          {comment.author.name}
                        </div>
                      </a>
                    </Link>
                    {comment.author.isVerified && (
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
                  <div className="text-xs text-gray-500">
                    <RelativeDate date={new Date(comment.createdAt)} />
                  </div>
                </div>
                <CommentVote comment={comment} />
              </div>
              <div className="whitespace-pre-line">{comment.content}</div>
              {state.commentToReply !== comment.id ? (
                <button
                  className="flex flex-row"
                  onClick={handleClickReplyButton}
                >
                  <div className="text-sm text-gray-500 cursor-pointer">
                    Ответить
                  </div>
                </button>
              ) : (
                <NewCommentForm
                  postId={postId}
                  parentId={comment.id}
                  onCreate={handleReply}
                  onCancelReply={handleCancelReply}
                />
              )}

              {((!comment.children && comment._count.children !== 0) ||
                state.isChildHidden(comment.id)) && (
                <div key={comment.id} className="flex flex-row">
                  <button
                    className="text-sm text-blue-500"
                    onClick={handleMoreCommentsClick}
                  >
                    Еще комментарии
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {!state.isChildHidden(comment.id) &&
          comment.children?.length !== 0 &&
          comment.children?.map((child, i) => {
            return (
              <Comment
                key={child.id}
                comment={child}
                postId={postId}
                state={state}
                onReply={onReply}
                level={level + 1}
                parentChilds={[...parentChilds, comment.children?.length]}
                parentIds={[...parentIds, comment.id]}
                childIndex={i}
              />
            );
          })}
      </>
    );
  }
);
