import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import { classNames, trpc, useVanillaTRPC } from "../../../utilities";
import { Spinner } from "../../spinner";

import { NewPostFormState } from "./new-post-form.state";

const Editor = dynamic(() => import("../../editor").then((i) => i.Editor));

export const NewPostForm = observer(() => {
  const trpcClient = useVanillaTRPC();
  const userQuery = trpc.users.getMe.useQuery();
  const router = useRouter();
  const [state] = useState(() => new NewPostFormState(trpcClient, router));
  const subsitesQuery = trpc.subsites.getAll.useQuery();
  const subsites = subsitesQuery.data;
  const user = userQuery.data;

  if (!user || !subsites) {
    return null;
  }

  return (
    <div className="content relative flex flex-col gap-y-3">
      <Spinner
        isSpinning={subsitesQuery.isFetching || state.createPostTask.isRunning}
      />
      <div className="ce-block">
        <div className="ce-block__content">
          <div className="flex -my-2 flex-row justify-between">
            <Listbox
              as="div"
              className="relative"
              value={state.subsite}
              onChange={state.setSubsite}
            >
              <Listbox.Button
                className={classNames(
                  "flex flex-row gap-x-2 items-center py-2 text-sm rounded",
                  "text-gray-900 transition-colors duration-300  cursor-pointer"
                )}
              >
                <Image
                  className="w-6 h-6 rounded"
                  width={24}
                  height={24}
                  src={state.subsite?.avatar ?? user.avatar}
                />
                {state.subsite?.name ?? "Мой блог"}
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Listbox.Options
                  className={classNames(
                    "absolute -left-4 origin-top-left mt-2 w-56 max-h-56 z-10",
                    "bg-white shadow-lg ring-1 ring-amber-500 ring-opacity-50 rounded-md",
                    "overflow-auto focus:outline-none"
                  )}
                >
                  <Listbox.Option value={undefined}>
                    <div
                      className={classNames(
                        "flex flex-row gap-x-2 items-center px-4 py-2 text-sm",
                        "text-gray-900 hover:bg-gray-100 cursor-pointer"
                      )}
                    >
                      <Image
                        className="w-6 h-6 rounded"
                        width={24}
                        height={24}
                        src={user.avatar}
                        alt={user.name}
                      />
                      Мой блог
                    </div>
                  </Listbox.Option>
                  <hr />
                  {subsites.map((subsite) => (
                    <Listbox.Option key={subsite.id} value={subsite}>
                      <div
                        className={classNames(
                          "flex flex-row gap-x-2 items-center px-4 py-2 text-sm",
                          "text-gray-900 hover:bg-gray-100 cursor-pointer"
                        )}
                      >
                        <Image
                          className="w-6 h-6 rounded"
                          width={24}
                          height={24}
                          src={subsite.avatar}
                          alt={subsite.name}
                        />
                        {subsite.name}
                      </div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-y-3" onSubmit={state.handleSubmit}>
        {state.createPostTask.isFaulted && (
          <div className="text-red-500">
            {state.createPostTask.error.message}
          </div>
        )}
        <div className="ce-block">
          <div className="ce-block__content">
            <input
              id="title-input"
              className="w-full font-bold text-xl placeholder-gray-300 outline-none"
              placeholder="Заголовок"
              type="text"
              value={state.title}
              onChange={state.handleTitleChange}
            />
          </div>
        </div>
        {"title" in state.errors && (
          <div className="text-red-500">{state.errors["title"]}</div>
        )}
        <Editor
          placeholder="Напишите что-нибудь..."
          value={state.content}
          onChange={state.setContent}
        />
        {/*
        <TextArea
          className="min-h-[128px] placeholder-gray-300 outline-none"
          placeholder="Текст"
          value={state.content}
          onChange={state.handleContentChange}
        />
        */}
        {"content" in state.errors && (
          <div className="text-red-500">{state.errors["content"]}</div>
        )}

        <div className="flex flex-row justify-end items-center flex-wrap gap-3 content">
          {/*
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
          */}
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
