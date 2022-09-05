import { voteCommentInput } from "../inputs";

import { authGuard } from "@/guards";
import { comments, commentVotes } from "@/modules";
import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const vote = t.procedure
  .input(voteCommentInput)
  .use(authGuard)
  .mutation(async ({ input: { commentId, sign }, ctx: { user } }) => {
    const userId = user.id;

    const post = await prisma.comment.findFirstOrThrow({
      where: { id: commentId },
      select: {
        id: true,
        score: true,
        votes: {
          where: { commentId, userId },
          select: commentVotes.select(),
        },
      },
    });

    // CREATE
    // 42 -> +1 -> 43
    if (!post.votes.length) {
      return prisma.comment.update({
        where: { id: commentId },
        data: {
          score: { increment: sign },
          votes: { create: { sign, userId } },
        },
        select: comments.select(userId),
      });
    }

    const vote = post.votes[0];

    // DELETE
    // 42 -> +1 -> 43 -> +1 ->42
    if (vote.sign === sign) {
      return prisma.comment.update({
        where: { id: commentId },
        data: {
          score: { decrement: sign },
          votes: { delete: { commentId_userId: { commentId, userId } } },
        },
        select: comments.select(userId),
      });
    }

    // UPDATE
    // 42 -> +1 -> 43 -> -1 -> 41
    // 42 -> -1 -> 41 -> +1 -> 43
    return prisma.comment.update({
      where: { id: commentId },
      data: {
        score: { decrement: vote.sign - sign },
        votes: {
          update: {
            where: { commentId_userId: { commentId, userId } },
            data: { sign },
          },
        },
      },
      select: comments.select(userId),
    });
  });
