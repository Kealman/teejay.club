import { TInvite, InputError, signUpInput } from "@teejay/api";
import { makeAutoObservable } from "mobx";
import { NextRouter } from "next/router";
import { ChangeEvent, FormEvent } from "react";

import { Task, transformInputError, VanillaTRPC } from "../../../utilities";

export class SignUpFormState {
  constructor(
    public readonly trpcClient: VanillaTRPC,
    private router: NextRouter,
    private invite?: TInvite
  ) {
    makeAutoObservable(this, { trpcClient: false }, { autoBind: true });
  }

  private _login = "";

  get login() {
    return this._login.trim().toLowerCase();
  }

  handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    this._login = event.target.value;
  };

  private _email = "";

  get email() {
    return this._email.trim().toLowerCase();
  }

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this._email = event.target.value;
  };

  private _name = "";

  get name() {
    return this._name;
  }

  handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this._name = event.target.value;
  };

  private _password = "";

  get password() {
    return this._password;
  }

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this._password = event.target.value;
  };

  private _errors: Record<string, string[]> = {};

  get errors() {
    return this._errors;
  }

  private set errors(value: Record<string, string[]>) {
    this._errors = value;
  }

  signUpTask = new Task(async (input: Zod.infer<typeof signUpInput>) => {
    await this.trpcClient.auth.signUp.mutate(input);
  });

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.errors = {};
    try {
      const input = await signUpInput.parseAsync({
        code: this.invite?.code,

        login: this.login,
        email: this.email.length ? this.email : undefined,
        name: this.name.trim(),
        password: this.password,
      });
      await this.signUpTask.run(input);
    } catch (error) {
      if (error instanceof InputError) {
        this.errors = transformInputError(error);
      } else {
        throw error;
      }
    }
  };
}
