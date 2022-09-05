import { makeAutoObservable } from "mobx";

export class UiStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  private _isSidebarOpen = false;

  get isSidebarOpen() {
    return this._isSidebarOpen;
  }

  set isSidebarOpen(value: boolean) {
    this._isSidebarOpen = value;
  }

  recalculate() {
    if (typeof window !== "undefined") {
      this.isSidebarOpen = window.matchMedia("(min-width: 640px)").matches;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
