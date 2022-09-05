import { FormEventHandler, memo, ReactNode } from "react";

type Props = {
  title?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export const Form = memo<Props>(({ title, onSubmit, children }) => (
  <form className="relative flex flex-col gap-y-3 content" onSubmit={onSubmit}>
    {title && <div className="font-bold text-xl">{title}</div>}
    {children}
  </form>
));

Form.displayName = "Form";
