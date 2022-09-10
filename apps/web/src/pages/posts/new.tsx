import { Card } from "../../components/card";
import { NewComments } from "../../components/comments";
import { Page } from "../../components/page";
import { NewPostForm } from "../../components/posts";
import { withInitialData } from "../../utilities";

import type { NextPage } from "next";

export const getServerSideProps = withInitialData(async () => ({ props: {} }));

type Props = void;

const NewPostPage: NextPage<Props> = () => {
  return (
    <Page title="Новый пост в клуб TeeJay" description="">
      <Card className="md:max-w-3xl w-full md:mx-auto">
        <NewPostForm />
      </Card>
      <NewComments />
    </Page>
  );
};
export default NewPostPage;
