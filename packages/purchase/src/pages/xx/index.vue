<template>
  <h1>xx index ~</h1>
  <h1>{{ name }}</h1>
  <el-input v-model="name"></el-input>
</template>

<script lang="ts" setup>
const name = ref('')
</script>

<style>
.xx {
  color: azure;
}
</style>
