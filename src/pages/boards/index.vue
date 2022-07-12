<template>
  <div>
    <p>{{ $options.name }}</p>
    <kbutton
      class="mt-4"
      :icon="'add'"
      :fill-mode="'flat'"
      @click="toggleDialog"
      >Add new board</kbutton
    >

    <br /><br />
    <AppButton class="block">
      <router-link to="/boards/1">go to Board 1</router-link>
    </AppButton>

    <window
      v-if="visible"
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
            <kinput placeholder="Board title" />
          </label>
          <label class="k-form-field">
            <span>Description</span>
            <kinput placeholder="Board description" />
          </label>
        </fieldset>

        <div class="text-right mt-6">
          <kbutton @click="toggleDialog">Cancel</kbutton>
          <span class="mr-4"></span>
          <kbutton :theme-color="'primary'" @click="toggleDialog"
            >Submit</kbutton
          >
        </div>
      </form>
    </window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { Window } from "@progress/kendo-vue-dialogs";
import { Input } from "@progress/kendo-vue-inputs";

export default defineComponent({
  name: "BoardsPage",

  components: {
    kbutton: Button,
    window: Window,
    kinput: Input,
  },

  data() {
    return {
      visible: false,
    };
  },

  mounted() {
    console.log(this.$options.name);
  },

  computed: {},

  methods: {
    toggleDialog() {
      this.visible = !this.visible;
    },
  },
});
</script>
