import type { Board, Column, Task } from "@/types/index";
import { defineStore, acceptHMRUpdate } from "pinia";
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

    updateBoardColumns(board: Board) {
      const boardIndex = this.boards.findIndex((b) => b.id === board.id);
      if (boardIndex === -1) {
        this.boards.push(board);
      } else {
        this.boards[boardIndex] = board;
      }
      setStorage("boards", this.boards);
    },

    createBoard(boardData: Board) {
      const board = {
        id: boardData.id,
        title: boardData.title,
        image: boardData.image,
        order: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.boards.push(board);
      setStorage("boards", this.boards);
    },

    createColumn(boardId: string, columnData: Column) {
      const board = this.boards.find((board) => board.id === boardId);
      if (!board) return;
      if (board.order instanceof Array) {
        board.order.push(columnData);
        setStorage("boards", this.boards);
      }
    },

    createTask(boardId: string, columnId: string, taskData: Task) {
      const board = this.boards.find((board) => board.id === boardId);
      if (!board) return;
      const column = board.order.find((column) => column.id === columnId);
      if (!column) return;
      if (column.tasks instanceof Array) {
        column.tasks.push(taskData);
        setStorage("boards", this.boards);
      }
    },
  },

  getters: {
    getBoards: (state) => state.boards,
    getBoardById: (state) => {
      return (boardId: string) =>
        state.boards.filter((board) => board.id === boardId)[0];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBoardsStore, import.meta.hot));
}
