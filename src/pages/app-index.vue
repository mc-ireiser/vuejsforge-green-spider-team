<script setup lang="ts"></script>
<template>
  <div class="flex justify-center items-center h-[80vh]">
    <div class="text-center">
      <img
        class="block"
        src="https://vuejsforge.com/images/logo.svg"
        alt="Vue.js Forge"
      />
      <h1>You did it!</h1>
      <AppButton class="block">
        <a href="https://vi.to/hubs/vueforge" target="_blank">Get Started</a>
      </AppButton>
      <AppButton class="block">
        <router-link to="/boards">Boards</router-link>
      </AppButton>
    </div>
  </div>
</template>
