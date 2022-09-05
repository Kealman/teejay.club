import { createContext, memo, ReactNode, useContext, useState } from "react";

import { InitialData } from "../utilities";

import { UiStore } from "./ui.store";

export class RootStore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(initialData?: InitialData) {
    // hydrate
  }

  uiStore = new UiStore();
}

const RootStoreContext = createContext<RootStore>(null as unknown as RootStore);

type Props = {
  initialData?: InitialData;
  children: ReactNode;
};

export const RootStoreProvider = memo<Props>(({ initialData, children }) => {
  const [rootStore] = useState(() => new RootStore(initialData));
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
});

RootStoreProvider.displayName = "RootStoreProvider";

export function useRootStore() {
  return useContext(RootStoreContext);
}
