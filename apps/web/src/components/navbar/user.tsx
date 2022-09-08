import { TUser } from "@teejay/api";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type Props = {
  user: TUser;
};

export const User = memo<Props>(({ user }) => (
  <Link href={`/users/${user.id}`}>
    <a>
      <Image
        className="w-8 h-8 rounded"
        width={32}
        height={32}
        alt={user.name}
        src={user.avatar}
      />
    </a>
  </Link>
));

User.displayName = "User";
