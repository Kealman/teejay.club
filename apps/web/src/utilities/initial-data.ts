import { ParsedUrlQuery } from "querystring";

import { TUser } from "@teejay/api";
import {
  GetServerSideProps,
  GetServerSidePropsContext as Context,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";

import { extractAccessToken } from "./access-token";
import { createClientSideTRPC } from "./trpc";

export async function fetchInitialData(context: Context) {
  const accessToken = extractAccessToken(context.req.headers.cookie);
  const trpc = createClientSideTRPC(accessToken);

  let user: TUser | null;
  try {
    user = accessToken ? await trpc.users.getMe.query() : null;
  } catch (error) {
    user = null;
  }
  return { user };
}

export type InitialData = Awaited<ReturnType<typeof fetchInitialData>>;

export const withInitialData = <
  P extends { [key: string]: unknown },
  Q extends ParsedUrlQuery,
  D extends PreviewData
>(
  gssp: GetServerSideProps<P, Q, D>
) => {
  return async (
    context: GetServerSidePropsContext<Q, D>
  ): Promise<GetServerSidePropsResult<P>> => {
    const result = await gssp(context);
    const initialData = await fetchInitialData(context);
    if ("props" in result) {
      const props = {
        ...(await result.props),
        initialData,
      };
      return { props };
    }
    return result;
  };
};
