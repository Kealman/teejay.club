import { TComment } from "@teejay/api";

export type CommentOrChild =
  | TComment
  | TComment["children"][number]
  | TComment["children"][number]["children"][number];
