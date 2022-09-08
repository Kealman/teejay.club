export type { AppRouter } from "@/router";

export type { TInvite } from "@/modules/invites";
export type { TUser } from "@/modules/users";
export type { TPost } from "@/modules/posts";
export type { TPostVote } from "@/modules/post-votes";
export type { TComment } from "@/modules/comments";
export type { TCommentVote } from "@/modules/comment-votes";
export type { TSubsite } from "@/modules/subsites";

export { ZodError as InputError } from "zod";
export type { infer as InferInput } from "zod";
export * from "@/modules/auth/inputs";
export * from "@/modules/posts/inputs";
export * from "@/modules/comments/inputs";
