import { TPost } from "@teejay/api";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { classNames, useVanillaTRPC } from "../../../utilities";

import { PostVoteState } from "./post-vote.state";

type Props = { post: TPost };

export const PostVote = observer<Props>(({ post }) => {
  const trpcClient = useVanillaTRPC();
  const [state] = useState(() => new PostVoteState(trpcClient, post));
  return (
    <div className="ml-auto flex flex-row items-center text-sm">
      <button
        className={classNames({
          "p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-500":
            true,
          "hover:bg-red-100": state.vote?.sign === -1,
        })}
        onClick={state.handleDownvoteClick}
      >
        <svg
          className={classNames({
            "w-5 h-5 transition-colors duration-500": true,
            "stroke-black": state.vote?.sign !== -1,
            "stroke-red-600": state.vote?.sign === -1,
          })}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={classNames({
          " font-medium transition-colors duration-500": true,
          "text-green-600": state.post.score > 0,
          "text-red-600": state.post.score < 0,
        })}
      >
        {state.post.score >= 0 && <span className="invisible">-</span>}
        {state.post.score}
        <span className="invisible">-</span>
      </div>
      <button
        className={classNames({
          "p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-500":
            true,
          "hover:bg-green-100": state.vote?.sign === 1,
        })}
        onClick={state.handleUpvoteClick}
      >
        <svg
          className={classNames({
            "w-5 h-5 transition-colors duration-500": true,
            "stroke-black": state.vote?.sign !== 1,
            "stroke-green-600": state.vote?.sign === 1,
          })}
          strokeWidth={2}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
});
