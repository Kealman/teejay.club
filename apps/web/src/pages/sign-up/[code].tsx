import { TInvite } from "@teejay/api";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

import { SignUpForm } from "../../components/auth/sign-up-form";
import { Card } from "../../components/card";
import { Page } from "../../components/page/page";
import { initVanillaTRPC, withInitialData } from "../../utilities";

type Query = { code: string };

type Context = GetServerSidePropsContext<Query>;

export const getServerSideProps = withInitialData(
  async (
    context: Context
  ): Promise<GetServerSidePropsResult<{ invite: TInvite }>> => {
    try {
      const trpc = initVanillaTRPC(context.req.headers.cookie);
      const invite = await trpc.invites.getOne.query({
        code: context.params?.code ?? "",
      });
      return { props: { invite } };
    } catch (error) {
      console.log(error);
      return { notFound: true };
    }
  }
);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function SignIn({ invite }: Props) {
  return (
    <Page title="Приглашение в клуб TeeJay">
      <Card className="md:max-w-2xl w-full md:mx-auto">
        <SignUpForm invite={invite} />
      </Card>
    </Page>
  );
}
