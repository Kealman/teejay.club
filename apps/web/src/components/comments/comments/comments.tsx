import { AppRouter } from "@teejay/api";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { useInfiniteScroll } from "../../../hooks";
import { trpc } from "../../../utilities";
import { Card } from "../../card";
import { PluralForm } from "../../plural-form";
import { Spinner } from "../../spinner";
import { Comment } from "../comment";
import { NewCommentForm } from "../new-comment-form";

import CommentsState from "./comments.state";

type Props = {
  postId: number;

  comments: AppRouter["comments"]["getMany"]["_def"]["_output_out"];
};

export const Comments = observer<Props>(({ postId, comments }) => {
  const [state] = useState(() => new CommentsState());
  const commentsQuery = trpc.comments.getMany.useInfiniteQuery(
    {
      postId,
      sort: "old",
      take: 20,
    },
    {
      initialData: {
        pages: [comments],
        pageParams: [],
      },
      getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
    }
  );

  useInfiniteScroll(
    commentsQuery.isFetching,
    commentsQuery.hasNextPage,
    commentsQuery.fetchNextPage
  );

  const { total } = commentsQuery.data?.pages?.[0]?.meta ?? { total: 0 };

  return (
    <Card id="comments" className="relative flex flex-col w-full max-w-2xl">
      <div className="font-bold text-xl">
        {total}{" "}
        <PluralForm
          number={total}
          one="комментарий"
          few="комментария"
          many="комментариев"
        />
      </div>
      <div className="relative mt-3 flex flex-col">
        <Spinner isSpinning={commentsQuery.isLoading} />
        {total > 10 && (
          <NewCommentForm postId={postId} onCreate={commentsQuery.refetch} />
        )}
        {commentsQuery.data?.pages.flatMap((page) =>
          page.data.map((comment) => (
            <Comment
              key={comment.id}
              postId={postId}
              comment={comment}
              state={state}
              onReply={commentsQuery.refetch}
              level={0}
              parentChilds={[]}
              parentIds={[]}
            />
          ))
        )}
        <NewCommentForm postId={postId} onCreate={commentsQuery.refetch} />
      </div>
    </Card>
  );
});
