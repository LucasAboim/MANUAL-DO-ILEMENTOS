<script setup>
import { ref } from 'vue'
import chapters from '~/content/chapters.js'

const open = ref(false)
</script>

<template>
  <div class="bg-gray-800 text-white p-4 sticky top-0 z-50">
    <div class="flex justify-between items-center">
      <h1 class="text-lg font-bold">📚 Manual dos Ilementos</h1>
      <button @click="open = !open" class="text-sm underline">
        {{ open ? 'Fechar índice' : 'Abrir índice' }}
      </button>
    </div>
    <div v-if="open" class="mt-4 space-y-1">
      <div
          v-for="(chapter, i) in chapters"
          :key="i"
          class="pl-2 border-l border-white"
      >
        {{ chapter.title }}
      </div>
    </div>
  </div>
</template>
