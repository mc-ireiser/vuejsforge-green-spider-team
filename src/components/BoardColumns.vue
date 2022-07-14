<template>
  <hr class="my-4" />
  <div class="mb-4">
    <div class="drag-container">
      <draggable
        class="dragArea list-group flex gap-4 mb-4"
        :list="boardData.order"
        @change="updateColumns(boardData)"
      >
        <div
          class="list-group-column bg-gray-300 m-1 p-3 rounded-md text-center"
          v-for="(column, columnIndex) in boardData.order"
          :key="column.id"
        >
          {{ column.title }}
          <draggable
            class="dragArea"
            group="tasks"
            :list="column.tasks"
            @change="updateColumns(boardData)"
          >
            <div
              class="list-group-item bg-gray-300 m-1 p-3 rounded-md"
              v-for="task in column.tasks"
              :key="task.id"
            >
              <div class="text-left full-width flex-grow">
                <router-link :to="`/boards/${boardData.id}/tasks/${task.id}`">
                  <span class="k-icon k-i-hyperlink-open mr-2"></span>
                  <span class="font-bold">{{ task.title }}</span>
                </router-link>
                <p class="font-light mt-2 truncate">
                  {{ task.description }}
                </p>
              </div>
            </div>
            <div v-if="column.tasks.length === 0">
              <div class="empty-column rounded-md full-width">
                <div class="text-center">
                  <span class="k-icon k-i-empty-box"></span>
                  <span class="font-bold">No tasks to do</span>
                </div>
              </div>
            </div>
          </draggable>
          <BoardCreateTask
            :boardId="boardData.id"
            :columnId="column.id"
          ></BoardCreateTask>
          <kbutton
            class="mt-4"
            :icon="'trash'"
            :fill-mode="'flat'"
            @click="removeBoardColumn(boardData, columnIndex)"
            >Remove Board</kbutton
          >
        </div>
      </draggable>
    </div>
  </div>
  <hr />
</template>

<script lang="ts">
import type { Board } from "@/types/index";
import { defineComponent, type PropType } from "vue";
import { useBoardsStore } from "@/stores/boards";
import { VueDraggableNext } from "vue-draggable-next";
import { Button } from "@progress/kendo-vue-buttons";

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    kbutton: Button,
  },
  props: {
    boardData: {
      type: Object as PropType<Board>,
      required: true,
    },
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    };
  },
  methods: {
    log(event: string) {
      console.log(event);
    },
    updateColumns(board: Board) {
      useBoardsStore().updateBoard(board);
    },
    removeBoardColumn(board: Board, columnIndex: number) {
      board.order.splice(columnIndex, 1);
      useBoardsStore().updateBoardColumns(board);
    },
  },
});
</script>

<style>
.drag-container {
  overflow-x: auto;
  height: 70vh;
  max-height: 70vh;
  width: 90%;
}

.list-group-column {
  padding: 20px;
  min-width: 300px;
  max-width: 400px;
}

.list-group-item {
  padding: 10px;
  margin: 10px;
  background-color: aliceblue;
  border-color: whitesmoke;
  border-style: solid;
  border-width: 5px;
}

.empty-column {
  padding: 30px;
  margin: 10px;
  background-color: rgba(240, 248, 255, 0.5);
}
</style>
