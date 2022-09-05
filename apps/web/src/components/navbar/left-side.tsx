import { observer } from "mobx-react-lite";

import { Hamburger } from "./hamburger";
import { Logo } from "./logo";

export const LeftSide = observer(() => {
  return (
    <div className="flex flex-row items-center">
      <Hamburger />
      <Logo />
    </div>
  );
});

LeftSide.displayName = "LeftSide";
