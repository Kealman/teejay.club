import { InferGetServerSidePropsType } from "next";
import { Fragment } from "react";

import { NewComments } from "../components/comments";
import { Page } from "../components/page";
import { Post } from "../components/posts";
import { useInfiniteScroll } from "../hooks";
import { initVanillaTRPC, trpc, withInitialData } from "../utilities";

export const getServerSideProps = withInitialData(async (context) => {
  const trpc = initVanillaTRPC(context.req.headers.cookie);
  const posts = await trpc.posts.getBest.query({ of: "today", take: 10 });
  return { props: { posts } };
});

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Top({ posts }: Props) {
  const postsQuery = trpc.posts.getBest.useInfiniteQuery(
    { of: "today", take: 10 },
    {
      initialData: {
        pages: [posts],
        pageParams: [],
      },
      getNextPageParam: (page) => page.meta.nextCursor,
    }
  );

  useInfiniteScroll(
    postsQuery.isFetching,
    postsQuery.hasNextPage,
    postsQuery.fetchNextPage
  );

  if (!postsQuery.data) {
    return null;
  }

  const { pages } = postsQuery.data;

  return (
    <Page title="Популярное в клубе TeeJay">
      <div className="md:max-w-2xl w-full md:mx-auto">
        <div className="flex flex-col gap-y-4 md:mr-4 xl:mr-0">
          {pages.map((page, i) => (
            <Fragment key={i}>
              {page.data.map((post) => (
                <Post key={post.id} post={post} isPreview={true} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <NewComments />
    </Page>
  );
}
