import { TUser } from "@teejay/api";
import Image from "next/image";
import { memo } from "react";

import { Link } from "../link";

type Props = {
  user: TUser;
};

export const User = memo<Props>(({ user }) => (
  <Link href={`/users/${user.id}`}>
    <Image
      className="w-8 h-8 rounded"
      width={32}
      height={32}
      alt={user.name}
      src={user.avatar}
    />
  </Link>
));

User.displayName = "User";
