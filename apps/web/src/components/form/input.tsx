import { memo } from "react";

import { classNames } from "../../utilities";

type Props = JSX.IntrinsicElements["input"];

export const Input = memo<Props>((props) => (
  <input
    {...props}
    className={classNames(
      "py-1 px-3 w-full bg-gray-100 rounded border border-gray-200 placeholder-gray-600 text-gray-600 outline-amber-500",
      props.className ?? ""
    )}
  />
));

Input.displayName = "Input";
