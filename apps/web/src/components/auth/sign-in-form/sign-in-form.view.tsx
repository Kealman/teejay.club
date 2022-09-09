import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useState } from "react";

import { useVanillaTRPC } from "../../../utilities";
import { Field, Form, Input } from "../../form";
import { Link } from "../../link";
import { Spinner } from "../../spinner";

import { SignInFormState } from "./sign-in-form.state";

export const SignInForm = observer(() => {
  const trpcClient = useVanillaTRPC();
  const router = useRouter();
  const [state] = useState(() => new SignInFormState(trpcClient, router));
  return (
    <Form title="Вход" onSubmit={state.handleSubmit}>
      <Spinner isSpinning={state.signInTask.isRunning} />
      {state.signInTask.isFaulted && (
        <div className="text-red-500">Неправильный логин или пароль</div>
      )}
      <Field label="Логин" isRequired errors={state.errors["login"]}>
        <Input
          placeholder="Введите логин"
          type="text"
          name="login"
          value={state.login}
          onChange={state.handleLoginChange}
        />
      </Field>
      <Field label="Пароль" isRequired errors={state.errors["password"]}>
        <Input
          placeholder="Введите пароль"
          type="password"
          name="password"
          value={state.password}
          onChange={state.handlePasswordChange}
        />
      </Field>
      <div className="flex flex-row justify-end gap-x-2">
        <Link
          href="/sign-up"
          className="px-3 py-1 rounded bg-white text-blue border-none cursor-pointer"
        >
          Зарегистрироваться
        </Link>
        <button
          type="submit"
          className="px-3 py-1 rounded bg-blue-500 text-white cursor-pointer"
        >
          Войти
        </button>
      </div>
    </Form>
  );
});
