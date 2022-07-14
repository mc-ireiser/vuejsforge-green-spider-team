<template>
  <div>
    <p>{{ board.title }}</p>

    <BoardCreateColumn></BoardCreateColumn>
    <br />
    <BoardColumn></BoardColumn>

    <br />
    <AppButton class="block">
      <router-link to="/boards/1/tasks/1">go to Task 1</router-link>
    </AppButton>
  </div>
</template>

<script lang="ts">
import type { Board } from "@/types/index";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardPage",
  data() {
    return {
      board: {} as Board,
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
  computed: {},
  methods: {},
});
</script>
