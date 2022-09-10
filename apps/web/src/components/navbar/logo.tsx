import { memo } from "react";

import { Link } from "../link";

export const Logo = memo(() => (
  <Link href="/" className="flex flex-row items-baseline">
    <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <rect className="fill-amber-500" y="32" width="32" height="16" />
      <path className="fill-black" d="M0 0H48V16H0V0Z" />
      <path className="fill-black" d="M16 0H32V48H16V0Z" />
    </svg>
    {/*
      <div className="-mx-1 font-black text-lg uppercase leading-[0]">
        TeeJay
      </div>
      */}
  </Link>
));

Logo.displayName = "Logo";
