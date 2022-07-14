<template>
  <div class="overflow-scroll">
    <p>{{ $options.name }}</p>
    <BoardCreateForm
      :boards="getBoards"
      @BOARD_CREATED="updateBoardsList"
    ></BoardCreateForm>
    <hr v-if="hasBoards" class="my-4" />
    <div class="flex flex-wrap gap-4 mb-6 mx-2 cards-container">
      <div v-for="(board, index) in getBoards" :key="index">
        <BoardCard
          :board="board"
          :boardIndex="index"
          @DELETE_BOARD="deleteBoard"
        ></BoardCard>
      </div>
    </div>
    <hr v-if="hasBoards" />
  </div>
</template>

<script lang="ts">
import type { Board } from "@/types/index";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useBoardsStore } from "@/stores/boards";

export default defineComponent({
  name: "BoardsPage",
  data() {
    return {
      loading: false,
      boards: [] as Board[],
    };
  },
  mounted() {
    console.log(this.$options.name);
    this.updateBoardsList();
  },
  computed: {
    ...mapState(useBoardsStore, {
      getBoards: (store) => store.getBoards,
    }),

    hasBoards() {
      // eslint-disable-next-line
      // @ts-ignore
      return this.getBoards?.length > 0;
    },
  },
  methods: {
    updateBoardsList() {
      this.boards = JSON.parse(localStorage.getItem("boards") || "[]");
      useBoardsStore().updateBoards(this.boards);
    },
    deleteBoard(boardIndex: number) {
      this.boards.splice(boardIndex, 1);
      useBoardsStore().updateBoards(this.boards);
    },
  },
});
</script>

<style>
.cards-container {
  overflow: scroll;
  max-height: 70vh;
}
</style>
