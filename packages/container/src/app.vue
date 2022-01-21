<template>
  <h1>app</h1>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(
  () => {
    console.log('xx')
  }
)
</script>

<style>
.container {
  color: aqua;
}
</style>
