<script setup>
import { reactive, ref, onMounted } from 'vue'

const data = reactive({

})

const props = defineProps({
  score: Number
})

onMounted(async () => {

})

</script>

<template>
  <div class="text-slate-200 absolute top-0 left-0 w-screen">
    <div class="flex items-center justify-between m-[0px_10px_0px_10px]">
      <!-- Title -->
      <h1 class="text-lg font-bold">Higher Lower Music</h1>
      <!-- Score -->
      <h2 class="">Score: {{ props.score }}</h2>
    </div>
  </div>
</template>

<style scoped>

</style>
