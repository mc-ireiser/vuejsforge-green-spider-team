<template>
  <card
    style="
      width: 260px;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
      margin-top: 15px;
    "
  >
    <router-link :to="`/boards/${board.id}`">
      <cardHeader class="k-hbox" style="background: transparent">
        <div>
          <cardTitle style="margin-bottom: 4px">
            {{ boardIndex + 1 }}. {{ board.title }}
          </cardTitle>
          <cardSubtitle>
            <p>{{ board?.createdAt?.toString().split("T")[0] }}</p>
          </cardSubtitle>
        </div>
      </cardHeader>
      <cardImage
        :src="typeof board.image === 'string' ? board.image : ''"
        style="height: 185px; max-width: 100%"
      />
    </router-link>
    <cardActions style="display: flex; justify-content: space-between">
      <div>
        <kbutton :fill-mode="'flat'" :icon="'trash'" @click="deleteBoard">
        </kbutton>
      </div>
    </cardActions>
  </card>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { Board } from "@/types/index";
import { defineComponent } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardImage,
  CardActions,
} from "@progress/kendo-vue-layout";
import { Button } from "@progress/kendo-vue-buttons";

export default defineComponent({
  components: {
    card: Card,
    cardHeader: CardHeader,
    cardTitle: CardTitle,
    cardSubtitle: CardSubtitle,
    cardImage: CardImage,
    cardActions: CardActions,
    kbutton: Button,
  },

  props: {
    boardIndex: {
      type: Number as PropType<number>,
      required: true,
    },
    board: {
      type: Object as PropType<Board>,
      required: true,
    },
  },

  methods: {
    deleteBoard() {
      this.$emit("DELETE_BOARD", this.boardIndex);
    },
  },
});
</script>
