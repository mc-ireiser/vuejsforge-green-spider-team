<template>
  <div>
    <p>{{ board.title }}</p>
    <BoardCreateColumn></BoardCreateColumn>
    <BoardColumns :boardData="boardData"></BoardColumns>
  </div>
</template>

<script lang="ts">
import type { Board } from "@/types/index";
import { defineComponent } from "vue";
import { useBoardsStore } from "@/stores/boards";
import { mapState } from "pinia";

export default defineComponent({
  name: "BoardPage",
  data() {
    return {
      board: {} as Board,
      boardId: this.$route.params.boardId as string,
    };
  },
  mounted() {
    console.log(this.$options.name);
    const boards = JSON.parse(localStorage.getItem("boards") || "[]");
    if (boards instanceof Array) {
      this.board = boards.filter(
        (item) => item.id === this.$route.params.boardId
      )[0];
    }
  },
  computed: {
    ...mapState(useBoardsStore, {
      getBoard: (store) => store.getBoardById,
    }),

    boardData() {
      return this.getBoard(this.boardId);
    },
  },
  methods: {},
});
</script>
