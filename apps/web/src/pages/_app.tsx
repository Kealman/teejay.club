import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { useState } from "react";
import superjson from "superjson";

import { RootStoreProvider } from "../stores/root.store";
import {
  extractAccessToken,
  InitialData,
  initVanillaTRPC,
  trpc,
  VanillaTRPCProvider,
} from "../utilities";

import "../styles/globals.css";

type Props = Omit<AppProps, "pageProps"> & {
  pageProps: { initialData?: InitialData };
};

function App({ Component, pageProps: { initialData, ...pageProps } }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: (process.env.NEXT_PUBLIC_API_HOSTNAME ?? "") + "/trpc",
      transformer: superjson,
      headers() {
        const token = extractAccessToken(document.cookie);
        return { Authorization: token && "Bearer " + token };
      },
    })
  );
  const [vanillaTrpcClient] = useState(() =>
    initVanillaTRPC(typeof window !== "undefined" ? document.cookie : undefined)
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <VanillaTRPCProvider value={vanillaTrpcClient}>
          <RootStoreProvider initialData={initialData}>
            <Component {...pageProps} />
          </RootStoreProvider>
        </VanillaTRPCProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
