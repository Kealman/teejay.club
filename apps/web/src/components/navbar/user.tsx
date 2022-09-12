import { TUser } from "@teejay/api";
import { memo } from "react";

import { getAvatarUrl } from "../../utilities";
import { Link } from "../link";

type Props = {
  user: TUser;
};

export const User = memo<Props>(({ user }) => (
  <Link href={`/users/${user.id}`}>
    <img
      className="w-8 h-8 rounded"
      width={32}
      height={32}
      alt={user.name}
      src={getAvatarUrl(user.avatarId)}
    />
  </Link>
));

User.displayName = "User";
