import { memo } from "react";

import { classNames } from "../../utilities";

type Props = JSX.IntrinsicElements["div"];

export const Card = memo<Props>(({ children, className, ...props }) => (
  <div
    className={classNames("p-4 bg-white md:rounded shadow-sm", className)}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = "Card";
