import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useState } from "react";

import { useVanillaTRPC } from "../../../utilities";
import { Spinner } from "../../spinner";
import { TextArea } from "../../text-area";

import { NewPostFormState } from "./new-post-form.state";

export const NewPostForm = observer(() => {
  const trpcClient = useVanillaTRPC();
  const router = useRouter();
  const [state] = useState(() => new NewPostFormState(trpcClient, router));

  return (
    <div className="relative flex flex-col gap-y-3 content">
      <Spinner isSpinning={state.createPostTask.isRunning} />
      <form className="flex flex-col gap-y-3" onSubmit={state.handleSubmit}>
        {state.createPostTask.isFaulted && (
          <div className="text-red-500">
            {state.createPostTask.error.message}
          </div>
        )}
        <input
          className="w-full font-bold text-xl placeholder-gray-300 outline-none"
          placeholder="Заголовок"
          type="text"
          value={state.title}
          onChange={state.handleTitleChange}
        />
        {"title" in state.errors && (
          <div className="text-red-500">{state.errors["title"]}</div>
        )}
        <TextArea
          className="min-h-[128px] placeholder-gray-300 outline-none"
          placeholder="Текст"
          value={state.content}
          onChange={state.handleContentChange}
        />
        {"content" in state.errors && (
          <div className="text-red-500">{state.errors["content"]}</div>
        )}

        <div className="flex flex-row justify-between items-center flex-wrap gap-3">
          <div className="flex flex-row items-center gap-x-1">
            <svg
              className="w-5 h-5 fill-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z" />
            </svg>
            <div className="text-gray-400">
              Для разметки используйте{" "}
              <a href="/markdown" target="_blank" rel="noreferrer">
                Markdown
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="px-3 py-1 rounded bg-blue-500 text-white cursor-pointer"
          >
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  );
});
