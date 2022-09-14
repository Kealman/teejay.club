import { TUser } from "@teejay/api";
import {
  ChangeEventHandler,
  DragEventHandler,
  memo,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  classNames,
  extractAccessToken,
  getAvatarUrl,
  trpc,
} from "../../utilities";
import { Spinner } from "../spinner";

type Props = {
  user: TUser;
};

export const AvatarChanger = memo<Props>(({ user }) => {
  const userQuery = trpc.users.getMe.useQuery(void 0, {
    initialData: user,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isHighlighted, setIsHighlighted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener("dragover", () => setIsHighlighted(true));
    window.addEventListener("dragleave", () => setIsHighlighted(false));
  }, []);

  const changeAvatar = async (file: File) => {
    setIsLoading(true);
    setIsError(false);

    const body = new FormData();
    body.set("file", file);
    const accessToken = extractAccessToken(document.cookie);
    const response = await fetch(
      (process.env.NEXT_PUBLIC_API_HOSTNAME ?? "") + "/avatars",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
      }
    );

    if (response.status !== 200) {
      setIsError(true);
    }
    setIsLoading(false);
    userQuery.refetch();
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = async () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files?.length) {
      return;
    }

    changeAvatar(event.target.files[0]);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();

    setIsHighlighted(false);

    if (!event.dataTransfer.files.length) {
      return;
    }

    changeAvatar(event.dataTransfer.files[0]);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className={classNames(
        "group relative w-32 h-32 rounded outline outline-4 outline-offset-2 outline-transparent cursor-pointer overflow-hidden",
        {
          "!outline-gray-300": isHighlighted,
          "!outline-red-500": isError,
        }
      )}
    >
      <Spinner isSpinning={isLoading || userQuery.isFetching} />
      <div className="group-hover:opacity-100 opacity-0 flex absolute inset-0 items-center justify-center bg-black/50 transition-opacity duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="white"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
      <img
        className="w-full h-full"
        src={getAvatarUrl(userQuery.data?.avatarId ?? null)}
        alt={user.name}
      />
    </div>
  );
});

AvatarChanger.displayName = "AvatarChanger";
