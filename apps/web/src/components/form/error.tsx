import { memo } from "react";

type Props = {
  children: string;
};

export const Error = memo<Props>(({ children }) => (
  <div className="text-red-500">{children}</div>
));

Error.displayName = "Error";
