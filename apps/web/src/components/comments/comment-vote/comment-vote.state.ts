import { TComment, TCommentVote } from "@teejay/api";
import { makeAutoObservable } from "mobx";

import { Task, ClientSideTRPC } from "../../../utilities";
import { CommentOrChild } from "../type";

export class CommentVoteState {
  constructor(
    public readonly trpcClient: ClientSideTRPC,
    private _comment: CommentOrChild
  ) {
    makeAutoObservable(this, { trpcClient: false }, { autoBind: true });
  }

  get comment() {
    return this._comment;
  }

  private set comment(value: CommentOrChild) {
    this._comment = value;
  }

  private _vote: TCommentVote | undefined = this.comment.votes.length
    ? this.comment.votes[0]
    : undefined;

  get vote() {
    return this._vote;
  }

  private set vote(value: TCommentVote | undefined) {
    this._vote = value;
  }

  voteTask = new Task(async (sign: -1 | 1) => {
    const comment = await this.trpcClient.comments.vote.mutate({
      commentId: this.comment.id,
      sign,
    });

    this.vote = comment.votes.length ? comment.votes[0] : undefined;
    this.comment = {
      ...this.comment,
      score: comment.score,
    };
  });

  handleDownvoteClick = async () => {
    await this.voteTask.run(-1);
  };

  handleUpvoteClick = async () => {
    await this.voteTask.run(1);
  };
}
