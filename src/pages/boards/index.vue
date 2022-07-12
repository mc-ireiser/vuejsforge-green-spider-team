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
    <hr v-if="hasBoards" class="my-4" />
    <div class="flex flex-wrap gap-4 mb-4 cards-container">
      <div v-for="(board, index) in boards" :key="index">
        <card
          style="
            width: 260px;
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
            margin-top: 15px;
          "
        >
          <cardHeader class="k-hbox" style="background: transparent">
            <div>
              <cardTitle style="margin-bottom: 4px">
                {{ board.title }}
              </cardTitle>
              <cardSubtitle>
                <p>{{ board.createdAt }}</p>
              </cardSubtitle>
            </div>
          </cardHeader>
          <cardImage
            :src="typeof board.image === 'string' ? board.image : ''"
            style="height: 185px; max-width: 100%"
          />
          <cardActions style="display: flex; justify-content: space-between">
            <div>
              <kbutton
                :fill-mode="'flat'"
                :icon="'trash'"
                @click="deleteBoard(index)"
              >
              </kbutton>
            </div>
          </cardActions>
        </card>
      </div>
    </div>
    <hr v-if="hasBoards" />

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
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardImage,
  CardActions,
} from "@progress/kendo-vue-layout";

export default defineComponent({
  name: "BoardsPage",

  components: {
    kbutton: Button,
    window: Window,
    kinput: Input,
    card: Card,
    cardHeader: CardHeader,
    cardTitle: CardTitle,
    cardSubtitle: CardSubtitle,
    cardImage: CardImage,
    cardActions: CardActions,
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

<style>
.cards-container {
  overflow: scroll;
  max-height: 70vh;
}
</style>
