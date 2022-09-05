import { Card } from "../components/card";
import { NewComments } from "../components/comments";
import { Page } from "../components/page";
import { withInitialData } from "../utilities";

export const getServerSideProps = withInitialData(async () => {
  return { props: {} };
});

export default function Markdown() {
  return (
    <Page title="Язык разметки Markdown — TeeJay">
      <div className="md:max-w-2xl w-full md:mx-auto">
        <Card className="flex flex-col gap-y-3 content">
          <h1 className="!text-2xl">Язык разметки Markdown</h1>
          <div className="mt-2 flex flex-col gap-y-3 content">
            <p>
              Для форматирования текста на сайте используется Markdown. Это
              простой язык разметки, используемый для создания форматированного
              текста с помощью текстового редактора. Он позволяет добавлять к
              тексту базовое форматирование, используя символы, известные и
              доступные на всех клавиатурах.
            </p>
            <h2>Примеры</h2>
            <p>
              <strong>Код:</strong>
            </p>
            <pre>
              <code># Заголовок 1</code>
              <br />
              <code>## Заголовок 2</code>
              <br />
              <code>### Заголовок 3</code>
              <br />
            </pre>
            <p>
              <strong>Результат:</strong>
            </p>
            <h1>Заголовок 1</h1>
            <h2>Заголовок 2</h2>
            <h3>Заголовок 3</h3>
            <table>
              <thead>
                <tr>
                  <th className="w-1/2">Код</th>
                  <th className="w-1/2">Результат</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>*Курсив*</code>
                  </td>
                  <td>
                    <em>Курсив</em>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>**Жирный**</code>
                  </td>
                  <td>
                    <strong>Жирный</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>~~Зачеркнутый~~</code>
                  </td>
                  <td>
                    <del>Зачеркнутый</del>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>[Ссылка](https://google.com/)</code>
                  </td>
                  <td>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ссылка
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Код:</strong>
            </p>
            <pre>
              <code>
                | Столбец 1 | Столбец 2 | Столбец 3 |<br />| :-------- |
                :-------: | --------: |<br />| {"  "}Слева{"  "} | По центру |
                {"  "}Справа {"  "}|
              </code>
            </pre>
            <p>
              <strong>Результат:</strong>
            </p>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Столбец 1</th>
                  <th style={{ textAlign: "center" }}>Столбец 2</th>
                  <th style={{ textAlign: "right" }}>Столбец 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "left" }}>Слева</td>
                  <td style={{ textAlign: "center" }}>По центру</td>
                  <td style={{ textAlign: "right" }}>Справа</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Код:</strong>
            </p>
            <pre>
              <code>
                * Пункт 1<br />* Пункт 2<br />* Пункт 3
              </code>
            </pre>
            <p>
              <strong>Результат:</strong>
            </p>
            <ul>
              <li>Пункт 1</li>
              <li>Пункт 2</li>
              <li>Пункт 3</li>
            </ul>
            <hr />
            <p>
              <strong>Код:</strong>
            </p>
            <pre>
              <code>
                1. Пункт 1<br />
                2. Пункт 2<br />
                3. Пункт 3
              </code>
            </pre>
            <p>
              <strong>Результат:</strong>
            </p>
            <ol>
              <li>Пункт 1</li>
              <li>Пункт 2</li>
              <li>Пункт 3</li>
            </ol>
            <hr />
            <p>
              <strong>Код:</strong>
            </p>
            <pre>
              <code>`Встроенный код` с одинарными обратными кавычками</code>
            </pre>
            <p>
              <strong>Результат:</strong>
            </p>
            <p>
              <code>Встроенный код</code> с одинарными обратными кавычками
            </p>
            <hr />
            <p>
              <strong>Код:</strong>
            </p>
            <pre>
              <code>
                ```
                <br />
                &lt;!DOCTYPE html&gt;
                <br />
                &lt;html&gt;
                <br />
                {"  "}&lt;body&gt;
                <br />
                {"  "}
                {"  "}&lt;h1&gt;Мой первый заголовок&lt;/h1&gt;
                <br />
                {"  "}
                {"  "}&lt;p&gt;Мой первый абзац.&lt;/p&gt;
                <br />
                {"  "}&lt;/body&gt;
                <br />
                &lt;/html&gt;
                <br />
                ```
              </code>
            </pre>
            <p>
              <strong>Результат:</strong>
            </p>
            <pre>
              <code>
                &lt;!DOCTYPE html&gt;
                <br />
                &lt;html&gt;
                <br />
                {"  "}&lt;body&gt;
                <br />
                {"  "}
                {"  "}&lt;h1&gt;Мой первый заголовок&lt;/h1&gt;
                <br />
                {"  "}
                {"  "}&lt;p&gt;Мой первый абзац.&lt;/p&gt;
                <br />
                {"  "}&lt;/body&gt;
                <br />
                &lt;/html&gt;
              </code>
            </pre>
            <hr />
            <p>
              <strong>Код:</strong>
            </p>
            <pre>
              <code>
                &gt; Lorem ipsum dolor sit amet, conctetur adipiscing elit.
                Integer eget porta sapien, eget pellentesque sapien. Duis in
                aliquam elit. Mauris lacinia magna quis nibh commodo, sed
                elementum quam elementum.
              </code>
            </pre>
            <p>
              <strong>Результат:</strong>
            </p>
            <blockquote>
              <p>
                Lorem ipsum dolor sit amet, conctetur adipiscing elit. Integer
                eget porta sapien, eget pellentesque sapien. Duis in aliquam
                elit. Mauris lacinia magna quis nibh commodo, sed elementum quam
                elementum.
              </p>
            </blockquote>
          </div>
        </Card>
      </div>
      <NewComments />
    </Page>
  );
}
