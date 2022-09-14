import { createCommentInput, InferInput } from "@teejay/api";
import { makeAutoObservable } from "mobx";
import { ChangeEvent, FormEvent } from "react";

import { Task, ClientSideTRPC } from "../../../utilities";

class NewCommentFormState {
  constructor(
    public readonly trpcClient: ClientSideTRPC,
    private postId: number,
    private onCreate?: () => void,
    private parentId?: number
  ) {
    makeAutoObservable(this, { trpcClient: false }, { autoBind: true });
  }

  private _text = "";

  get text() {
    return this._text;
  }

  private set text(value: string) {
    this._text = value;
  }

  handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this._text = event.target.value;
  };

  get isSubmitButtonDisabled() {
    return this.text.length < 3;
  }

  createCommentTask = new Task(
    async (input: InferInput<typeof createCommentInput>) => {
      await this.trpcClient.comments.create.mutate(input);

      this.onCreate?.();

      this.text = "";
      this.createCommentTask.reset();
    }
  );

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const input = createCommentInput.parse({
        postId: this.postId,
        parentId: this.parentId,
        content: this.text.trim(),
      });
      await this.createCommentTask.run(input);
    } catch (error) {
      console.error(error);
    }
  };
}

export default NewCommentFormState;
