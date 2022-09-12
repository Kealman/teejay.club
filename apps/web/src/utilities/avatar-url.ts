export const getAvatarUrl = (avatarId: string | null) => {
  const host = process.env.NEXT_PUBLIC_API_HOSTNAME ?? "";
  return `${host}/avatars/${avatarId ?? "default"}`;
};
