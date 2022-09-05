import { createPostInput, InferInput, InputError } from "@teejay/api";
import { makeAutoObservable } from "mobx";
import { NextRouter } from "next/router";
import { ChangeEvent, FormEvent } from "react";

import { Task, transformInputError, VanillaTRPC } from "../../../utilities";

export class NewPostFormState {
  constructor(
    public readonly trpcClient: VanillaTRPC,
    private router: NextRouter
  ) {
    makeAutoObservable(this, { trpcClient: false }, { autoBind: true });
  }

  private _title = "";

  get title() {
    return this._title;
  }

  handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this._title = event.target.value;
  };

  private _content = "";

  get content() {
    return this._content;
  }

  handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this._content = event.target.value;
  };

  private _errors: Record<string, string[]> = {};

  get errors() {
    return this._errors;
  }

  private set errors(value: Record<string, string[]>) {
    this._errors = value;
  }

  createPostTask = new Task(
    async (input: InferInput<typeof createPostInput>) => {
      const post = await this.trpcClient.posts.create.mutate(input);
      await this.router.push(`/posts/${post.id}`);
    }
  );

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.errors = {};

    try {
      const input = createPostInput.parse({
        title: this.title,
        content: this.content,
      });
      await this.createPostTask.run(input);
    } catch (error) {
      if (error instanceof InputError) {
        this.errors = transformInputError(error);
      } else {
        throw error;
      }
    }
  };
}
