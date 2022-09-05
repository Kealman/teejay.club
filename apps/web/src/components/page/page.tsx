import Head from "next/head";
import { memo, ReactNode } from "react";

import { Navbar } from "../navbar";
import { Sidebar } from "../sidebar";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const Page = memo<Props>(
  ({
    title,
    description = "Интернет, технологии, политика, мемы и многое другое.",
    children,
  }) => (
    <div className="flex-1 pt-14">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Navbar />
      <main className="relative flex flex-row justify-center">
        <Sidebar />
        <div className="w-full py-4 flex flex-row items-start justify-center">
          {children}
        </div>
      </main>
    </div>
  )
);

Page.displayName = "Page";
