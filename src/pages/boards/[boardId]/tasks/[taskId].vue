<template>
  <div>
    <p>{{ $options.name }}</p>
    <AppButton class="block">
      <router-link :to="`/boards/${$route.params.boardId}`"
        >Go back</router-link
      >
    </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskPage",

  data() {
    return {
      ok: true,
    };
  },

  mounted() {
    console.log(this.$options.name);
  },

  computed: {},

  methods: {},
});
</script>
