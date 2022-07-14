<template>
  <div>
    <div class="custom-toolbar">
      <div class="toolbar-init">
        <kbutton :icon="'menu'" :fill-mode="'flat'" @click="handleClick" />
        <span class="title"> green-spider</span>
      </div>
      <div class="menu-buttons toolbar-end">
        <DropDownButton
          class="mr-4"
          :icon="'arrows-swap'"
          :text="'My team'"
          :items="teamItems"
        />
        <kbutton
          :icon="'logout'"
          :theme-color="'primary'"
          :fill-mode="'outline'"
          >logout</kbutton
        >
      </div>
    </div>
    <Drawer
      :expanded="expanded"
      :position="position"
      :mode="mode"
      :mini="true"
      :items="
        items.map((item, index) => ({
          ...item,
          selected: index === selectedId,
        }))
      "
      @select="onSelect"
    >
      <DrawerContent>
        <router-view />
      </DrawerContent>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Drawer, DrawerContent } from "@progress/kendo-vue-layout";
import { Button, DropDownButton } from "@progress/kendo-vue-buttons";
import "./styles.css";

export default defineComponent({
  name: "App",

  components: { Drawer, DrawerContent, kbutton: Button, DropDownButton },

  data() {
    return {
      teamItems: ["Team 1", "Team 2", "Team 3"],
      items: [
        {
          text: "Boards",
          icon: "k-i-inbox",
          selected: true,
          data: {
            path: "/boards",
          },
        },
        {
          separator: true,
        },
      ],
      expanded: false,
      selectedId: 0,
      position: "start",
      mode: "push",
    };
  },

  mounted() {
    if (this.items[0]?.data) {
      this.$router.push(this.items[0].data);
    }
  },

  methods: {
    onSelect(e: any) {
      this.selectedId = e?.itemIndex;
      const data = this.items[e.itemIndex]?.data;
      if (data) {
        this.$router.push(data);
      }
    },

    handleClick() {
      this.expanded = !this.expanded;
    },
  },
});
</script>

<style></style>
