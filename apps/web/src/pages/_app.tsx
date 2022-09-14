import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { useState } from "react";

import { RootStoreProvider } from "../stores/root.store";
import {
  InitialData,
  createClientSideTRPC,
  trpc,
  ClientSideTRPCProvider,
  createReactSideTRPC,
} from "../utilities";

import "../styles/globals.css";

type Props = Omit<AppProps, "pageProps"> & {
  pageProps: { initialData?: InitialData };
};

function App({ Component, pageProps: { initialData, ...pageProps } }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const [reactSideTRPC] = useState(() => createReactSideTRPC());
  const [clientSideTRPC] = useState(() => createClientSideTRPC());

  return (
    <trpc.Provider client={reactSideTRPC} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ClientSideTRPCProvider value={clientSideTRPC}>
          <RootStoreProvider initialData={initialData}>
            <Component {...pageProps} />
          </RootStoreProvider>
        </ClientSideTRPCProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
