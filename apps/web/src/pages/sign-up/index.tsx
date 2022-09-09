import { SignUpForm } from "../../components/auth/sign-up-form";
import { Card } from "../../components/card";
import { Page } from "../../components/page/page";
import { withInitialData } from "../../utilities";

export const getServerSideProps = withInitialData(async () => ({ props: {} }));

export default function SignIn() {
  return (
    <Page title="Регистрация в клубе TeeJay">
      <Card className="md:max-w-2xl w-full md:mx-auto">
        <SignUpForm />
      </Card>
    </Page>
  );
}
