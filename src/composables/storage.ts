import type { Board } from "@/types/index";

export function setStorage(key: string, data: Board[]) {
  localStorage.setItem(key, JSON.stringify(data));
}
