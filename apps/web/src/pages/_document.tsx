import { Head, Html, Main, NextScript } from "next/document";
import { FC } from "react";

const Document: FC = () => (
  <Html lang="ru">
    <Head>
      <link rel="icon" href="/logo.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
