<template>
  <div>
    <p>{{ $options.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Idata {
  ok: boolean;
}

export default defineComponent({
  name: "page-404",

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
