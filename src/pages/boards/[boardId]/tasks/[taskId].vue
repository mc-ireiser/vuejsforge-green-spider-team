<template>
  <div>
    <p>{{ $options.name }}</p>
    <AppButton class="block">
      <router-link to="/boards/1">Go back</router-link>
    </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Idata {
  ok: boolean;
}

export default defineComponent({
  name: "TaskPage",

  data(): Idata {
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
