<template>
  <div id="app" class="container-fluid px-0">
    <NavMenu />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import NavMenu from './components/NavMenu.vue';
</script>

<style scoped>
nav {
  margin-bottom: 10px;
}
</style>

