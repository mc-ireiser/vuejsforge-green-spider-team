<template>
  <div>
    <hr class="my-4" />
    <div class="mb-4 overflow-scroll">
      <div class="drag-container">
        <draggable
          class="dragArea list-group flex gap-4 mb-4"
          :list="boardData.order"
          @change="updateColumns(boardData)"
        >
          <div
            class="list-group-column bg-gray-300 rounded-md text-center"
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
                class="list-group-item rounded-md"
                v-for="task in column.tasks"
                :key="task.id"
              >
                <card
                  class="card"
                  style="
                    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
                    margin-top: 15px;
                  "
                >
                  <cardBody class="flex">
                    <div class="text-left full-width flex-grow">
                      <router-link
                        :to="`/boards/${boardData.id}/tasks/${task.id}`"
                      >
                        <span class="k-icon k-i-hyperlink-open mr-2"></span>
                        <span class="font-bold">{{ task.title }}</span>
                      </router-link>
                      <p class="font-light mt-2 truncate">
                        {{ task.description }}
                      </p>
                    </div>
                  </cardBody>
                </card>
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
  </div>
</template>

<script lang="ts">
import type { Board } from "@/types/index";
import { defineComponent, type PropType } from "vue";
import { useBoardsStore } from "@/stores/boards";
import { VueDraggableNext } from "vue-draggable-next";
import { Button } from "@progress/kendo-vue-buttons";
import { Card, CardBody } from "@progress/kendo-vue-layout";

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    kbutton: Button,
    card: Card,
    cardBody: CardBody,
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
  overflow: scroll;
  scroll-behavior: smooth;
  max-width: 85vw;
  max-height: 70vh;
}

.list-group-column {
  padding: 20px;
  min-width: 300px;
  max-width: 400px;
}

.empty-column {
  padding: 30px;
  margin: 10px;
  background-color: rgba(240, 248, 255, 0.5);
}

card {
  width: 100%;
}
</style>
