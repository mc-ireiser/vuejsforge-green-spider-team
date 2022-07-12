<template>
  <div>
    <p>{{ $options.name }}</p>
  </div>
</template>

<script lang="ts">
interface Idata {
  ok: boolean;
}

export default {
  name: "BoardPage",

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
};
</script>
