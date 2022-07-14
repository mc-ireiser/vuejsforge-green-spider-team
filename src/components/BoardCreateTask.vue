<template>
  <div>
    <kbutton
      class="mt-4"
      :icon="'add'"
      :fill-mode="'flat'"
      @click="toggleDialog"
      >Add new task</kbutton
    >
    <window
      v-if="visible"
      :modal="true"
      :draggable="false"
      :title="'Add new task'"
      class="text-left"
      @close="toggleDialog"
      :initial-width="650"
      :initial-height="450"
    >
      <form class="k-form">
        <fieldset>
          <legend>Task Details</legend>
          <label class="k-form-field">
            <span>Title</span>
            <kinput v-model="newTask.title" placeholder="Task title" />
          </label>
          <label class="k-form-field">
            <span>Description</span>
            <kinput
              v-model="newTask.description"
              placeholder="Task description"
            />
          </label>
          <label class="k-form-field">
            <span>Labels</span>
            <kinput
              v-model="newTask.description"
              placeholder="Task description"
            />
          </label>
          <label class="k-form-field">
            <span>Due at</span>
            <br />
            <datepicker
              :style="{ width: '230px' }"
              :default-value="new Date()"
              :default-Show="false"
            >
            </datepicker>
          </label>
        </fieldset>
        <div class="text-right mt-6">
          <kbutton @click="toggleDialog">Cancel</kbutton>
          <span class="mr-4"></span>
          <kbutton
            :theme-color="'primary'"
            @click.prevent="createNewTask"
            @keyup.enter="createNewTask"
            :disabled="loading"
            >Submit</kbutton
          >
        </div>
      </form>
    </window>
  </div>
</template>

<script lang="ts">
import type { Task } from "@/types/index";
import { defineComponent } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { Window } from "@progress/kendo-vue-dialogs";
import { Input } from "@progress/kendo-vue-inputs";
import { DatePicker } from "@progress/kendo-vue-dateinputs";
import { useBoardsStore } from "@/stores/boards";
import { v4 as uuid } from "uuid";

export default defineComponent({
  components: {
    kbutton: Button,
    window: Window,
    kinput: Input,
    datepicker: DatePicker,
  },

  props: {
    columnId: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      visible: false,
      newTask: {
        title: "",
        description: "",
        labels: [],
        dueAt: new Date(),
      },
    };
  },

  methods: {
    toggleDialog() {
      this.visible = !this.visible;
    },

    setDueatDate(e: any) {
      this.newTask.dueAt = e.target.value;
    },

    createNewTask() {
      this.loading = true;
      const id = uuid();
      const task: Task = {
        id,
        title: this.newTask.title,
        description: this.newTask.description,
        labels: this.newTask.labels,
        dueAt: this.newTask.dueAt,
      };

      useBoardsStore().createTask(this.boardId, this.columnId, task);
      this.newTask = {
        title: "",
        description: "",
        labels: [],
        dueAt: new Date(),
      };
      this.loading = false;
      this.toggleDialog();
    },
  },
});
</script>
