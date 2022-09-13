import { TPost, TPostVote } from "@teejay/api";
import { makeAutoObservable } from "mobx";

import { Task, ClientSideTRPC } from "../../../utilities";

export class PostVoteState {
  constructor(
    public readonly trpcClient: ClientSideTRPC,
    private _post: TPost
  ) {
    makeAutoObservable(this, { trpcClient: false }, { autoBind: true });
  }

  get post() {
    return this._post;
  }

  private set post(value: TPost) {
    this._post = value;
  }

  private _vote: TPostVote | undefined = this.post.votes.length
    ? this.post.votes[0]
    : undefined;

  get vote() {
    return this._vote;
  }

  private set vote(value: TPostVote | undefined) {
    this._vote = value;
  }

  voteTask = new Task(async (sign: -1 | 1) => {
    const post = await this.trpcClient.posts.vote.mutate({
      postId: this.post.id,
      sign,
    });

    this.vote = post.votes.length ? post.votes[0] : undefined;
    this.post = {
      ...this.post,
      score: post.score,
    };
  });

  handleDownvoteClick = async () => {
    await this.voteTask.run(-1);
  };

  handleUpvoteClick = async () => {
    await this.voteTask.run(1);
  };
}
