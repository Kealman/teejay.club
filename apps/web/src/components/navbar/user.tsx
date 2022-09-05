import { TUser } from "@teejay/api";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type Props = {
  user: TUser;
};

export const User = memo<Props>(({ user }) => (
  <Link href={`/users/${user.id}`}>
    <a className="relative w-8 h-8 rounded overflow-hidden">
      <Image layout="fill" alt={user.name} src="/avatar.webp" />
    </a>
  </Link>
));

User.displayName = "User";
