import { observer } from "mobx-react-lite";
import { useState } from "react";

import { classNames, useVanillaTRPC } from "../../../utilities";
import { Spinner } from "../../spinner";
import { TextArea } from "../../text-area";

import NewCommentFormState from "./new-comment-form.state";

type Props = {
  postId: number;
  parentId?: number;
  onCreate?: () => void;
  onCancelReply?: () => void;
};

export const NewCommentForm = observer<Props>(
  ({ postId, parentId, onCreate, onCancelReply }) => {
    const trpcClient = useVanillaTRPC();
    const [state] = useState(
      () => new NewCommentFormState(trpcClient, postId, onCreate, parentId)
    );
    const [isFocused, setIsFocused] = useState<boolean>(false);
    return (
      <form
        className={classNames(
          "relative mt-2 p-3 flex flex-col gap-y-3 border",
          "bg-gray-50 border-gray-100 rounded transition-all duration-300",
          {
            "!border-gray-200 shadow-inner": isFocused,
          }
        )}
        onSubmit={state.handleSubmit}
      >
        <Spinner isSpinning={state.createCommentTask.isRunning} />
        <TextArea
          className="min-h-[24px] resize-none bg-transparent outline-none transition-all duration-100"
          placeholder="Написать комментарий..."
          value={state.text}
          onChange={state.handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div
          className={classNames({
            "flex flex-row justify-end": true,
          })}
        >
          {parentId && (
            <button
              className="text-sm text-gray-500 cursor-pointer mr-10"
              onClick={onCancelReply}
            >
              Отменить
            </button>
          )}
          <button
            className={classNames({
              "bg-blue-300 cursor-default shadow-none":
                state.isSubmitButtonDisabled,
              "px-3 py-1 bg-blue-500 text-white rounded shadow cursor-pointer transition-all duration-300":
                true,
            })}
            type="submit"
            disabled={!state.text.length}
          >
            Отправить
          </button>
        </div>
      </form>
    );
  }
);
