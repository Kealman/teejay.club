import { AppRouter } from "@teejay/api";
import {
  createTRPCProxyClient,
  createTRPCReact,
  inferRouterProxyClient,
} from "@trpc/react";
import { createContext, useContext } from "react";
import superjson from "superjson";

import { extractAccessToken } from ".";

export const trpc = createTRPCReact<AppRouter>();

export function initVanillaTRPC(cookies?: string) {
  return createTRPCProxyClient<AppRouter>({
    url: (process.env.NEXT_PUBLIC_API_HOSTNAME ?? "") + "/trpc",
    transformer: superjson,
    headers() {
      const token = extractAccessToken(cookies);
      return { Authorization: token && "Bearer " + token };
    },
  });
}
export type VanillaTRPC = inferRouterProxyClient<AppRouter>;

const VanillaTRPCContext = createContext(null as unknown as VanillaTRPC);

export const VanillaTRPCProvider = VanillaTRPCContext.Provider;

export const useVanillaTRPC = () => {
  return useContext(VanillaTRPCContext);
};
