import { SignInForm } from "../../components/auth/sign-in-form";
import { Card } from "../../components/card";
import { Page } from "../../components/page/page";

export default function SignIn() {
  return (
    <Page title="Вход в клуб — TeeJay">
      <Card className="md:max-w-2xl w-full md:mx-auto">
        <SignInForm />
      </Card>
    </Page>
  );
}
