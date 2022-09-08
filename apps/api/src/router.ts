import { auth, comments, invites, posts, subsites, users } from "@/modules";
import { t } from "@/trpc";

export const appRouter = t.router({
  auth: auth.router,
  users: users.router,
  posts: posts.router,
  comments: comments.router,
  invites: invites.router,
  subsites: subsites.router,
});

export type AppRouter = typeof appRouter;
