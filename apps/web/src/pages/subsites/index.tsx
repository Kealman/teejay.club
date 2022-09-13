import Image from "next/image";

import { Card } from "../../components/card";
import { NewComments } from "../../components/comments";
import { Link } from "../../components/link";
import { Page } from "../../components/page";
import { createClientSideTRPC, withInitialData } from "../../utilities";

import type { InferGetServerSidePropsType, NextPage } from "next";

export const getServerSideProps = withInitialData(async (context) => {
  const trpc = createClientSideTRPC(context.req.headers.cookie);
  const subsites = await trpc.subsites.getAll.query();
  return { props: { subsites } };
});

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NewPostPage: NextPage<Props> = ({ subsites }) => {
  return (
    <Page title="Подсайты в клубе TeeJay" description="">
      <Card className="md:max-w-2xl w-full md:mx-auto p-0">
        <div className="flex flex-col">
          {subsites.map((subsite) => (
            <Link
              href={`/subsites/${subsite.slug}`}
              key={subsite.id}
              className="p-4 flex flex-row gap-x-4 hover:bg-gray-100 hover:shadow-inner transition-all duration-300"
            >
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded overflow-hidden">
                <Image src={subsite.avatar} width={48} height={48} />
              </div>
              <div className="flex flex-col">
                <div className="-mt-1 font-medium text-lg leading-0">
                  {subsite.name}
                </div>
                <div className="text-sm">{subsite.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
      <NewComments />
    </Page>
  );
};
export default NewPostPage;
