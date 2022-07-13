import type { Board } from "@/types/index";
import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuid } from "uuid";
import { setStorage } from "@/composables/storage";

export const useBoardsStore = defineStore("boardStore", {
  state: () => {
    return { boards: [] as Board[] };
  },

  actions: {
    updateBoards(boards: Board[]) {
      this.boards = boards;
      setStorage("boards", this.boards);
    },

    createBoard(boardData: Board) {
      const board = {
        id: uuid(),
        title: boardData.title,
        image: boardData.image,
        order: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.boards.push(board);
      setStorage("boards", this.boards);
    },
  },

  getters: {
    getBoards: (state) => state.boards,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBoardsStore, import.meta.hot));
}
