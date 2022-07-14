<template>
  <kbutton class="mt-4" :icon="'add'" :fill-mode="'flat'" @click="toggleDialog"
    >Add new column</kbutton
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
        <legend>Column Details</legend>
        <label class="k-form-field">
          <span>Title</span>
          <kinput v-model="newColumn.title" placeholder="Column title" />
        </label>
      </fieldset>
      <div class="text-right mt-6">
        <kbutton @click="toggleDialog">Cancel</kbutton>
        <span class="mr-4"></span>
        <kbutton
          :theme-color="'primary'"
          @click.prevent="createNewColumn"
          @keyup.enter="createNewColumn"
          :disabled="loading"
          >Submit</kbutton
        >
      </div>
    </form>
  </window>
</template>

<script lang="ts">
import type { Column } from "@/types/index";
import { defineComponent } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { Window } from "@progress/kendo-vue-dialogs";
import { Input } from "@progress/kendo-vue-inputs";
import { v4 as uuid } from "uuid";
import { useBoardsStore } from "@/stores/boards";

export default defineComponent({
  components: {
    kbutton: Button,
    window: Window,
    kinput: Input,
  },

  data() {
    return {
      loading: false,
      visible: false,
      newColumn: {
        title: "",
      },
    };
  },

  methods: {
    toggleDialog() {
      this.visible = !this.visible;
    },

    createNewColumn() {
      this.loading = true;
      const id = uuid();
      const boardId = this.$route.params.boardId as string;
      const newColumn: Column = {
        id,
        title: this.newColumn.title,
        taskIds: [],
      };
      console.log(boardId, newColumn);

      useBoardsStore().createColumn(boardId, newColumn);
      this.newColumn = { title: "" };
      this.loading = false;
      this.toggleDialog();
    },
  },
});
</script>
