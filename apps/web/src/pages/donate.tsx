import { Card } from "../components/card";
import { NewComments } from "../components/comments";
import { Page } from "../components/page";
import { withInitialData } from "../utilities";

export const getServerSideProps = withInitialData(async () => {
  return { props: {} };
});

export default function Donate() {
  return (
    <Page title="Поддержать клуб TeeJay">
      <div className="md:max-w-2xl w-full md:mx-auto overflow-hidden">
        <Card className="flex flex-col gap-y-3 content">
          <h1 className="!text-2xl">Поддержать клуб TeeJay</h1>
          <div className="mt-2 flex flex-col gap-y-3 content">
            <p>
              Клуб TeeJay развивается только за счёт сообщества. Вы тоже можете
              поучаствовать в его развитии. Для этого не обязательно уметь
              писать код. Можно помочь тестированием, финансами, железом,
              консультацией, идеями, модераторством, контентом и т.д. и т.п. Для
              этого вы можете перейти в Discord по ссылке в левом меню.
            </p>
            <p>
              Есть возможность помочь финансами? Вы можете сделать пожертвование
              в криптовалюте.
            </p>
            <h2>BTC</h2>
            <code className="-mx-4 p-4 overflow-auto">
              bc1qpz5zan2re29jufv85l58ha2ucvkqxuuq7k7kla
            </code>
          </div>
        </Card>
      </div>
      <NewComments />
    </Page>
  );
}
