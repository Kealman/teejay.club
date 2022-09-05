import { observer } from "mobx-react-lite";

import { useRootStore } from "../../stores/root.store";
import { classNames } from "../../utilities";
import { Logo } from "../navbar/logo";

import { Menu } from "./menu";

export const Sidebar = observer(() => {
  const { uiStore } = useRootStore();
  return (
    <div
      className={classNames("sidebar", {
        "sidebar--open": uiStore.isSidebarOpen,
      })}
    >
      <div className="sidebar__header">
        <div className="flex flex-row items-center">
          <button
            className="-ml-4 p-4 cursor-pointer"
            onClick={uiStore.toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Logo />
        </div>
      </div>
      <div className="mt-4">
        <Menu />
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";
