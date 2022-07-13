<template>
  <section>
    <kbutton
      class="mt-4"
      :icon="'add'"
      :fill-mode="'flat'"
      @click="toggleDialog"
      >Add new board</kbutton
    >
    <window
      v-if="visible"
      :modal="true"
      :title="'Add new board'"
      @close="toggleDialog"
      :initial-width="650"
      :initial-height="250"
    >
      <form class="k-form">
        <fieldset>
          <legend>Board Details</legend>

          <label class="k-form-field">
            <span>Title</span>
            <kinput v-model="newBoard.title" placeholder="Board title" />
          </label>
        </fieldset>
        <div class="text-right mt-6">
          <kbutton @click="toggleDialog">Cancel</kbutton>
          <span class="mr-4"></span>
          <kbutton
            :theme-color="'primary'"
            @click.prevent="createNewBoard"
            @keyup.enter="createNewBoard"
            :disabled="loading"
            >Submit</kbutton
          >
        </div>
      </form>
    </window>
  </section>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { Board } from "@/types/index";
import { defineComponent } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { Window } from "@progress/kendo-vue-dialogs";
import { Input } from "@progress/kendo-vue-inputs";
import { setStorage } from "@/composables/storage";
import { useBoardsStore } from "@/stores/boards";

export default defineComponent({
  components: {
    kbutton: Button,
    window: Window,
    kinput: Input,
  },

  props: {
    boards: {
      type: Array as PropType<Board[]>,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      visible: false,
      newBoard: {
        title: "",
        imageUrl: undefined,
      },
    };
  },

  methods: {
    toggleDialog() {
      this.visible = !this.visible;
    },

    createNewBoard() {
      this.loading = true;
      const id = Math.random() * 1000;

      const board: Board = {
        id: id.toString(),
        title: this.newBoard.title,
        image:
          this.newBoard.imageUrl ||
          `https://picsum.photos/258/185?random=${id}`,
        order: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      useBoardsStore().createBoard(board);

      // const boards = [...this.boards];
      // boards.push(board);
      // setStorage("boards", boards);

      this.newBoard = { title: "", imageUrl: undefined };
      this.loading = false;
      this.toggleDialog();
      // this.$emit("BOARD_CREATED");
    },
  },
});
</script>
