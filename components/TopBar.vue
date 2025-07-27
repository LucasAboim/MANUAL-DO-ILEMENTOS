<!--TopBar.vue-->
<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const emit = defineEmits(['select-page'])
const props = defineProps({
  chapters: Array
})

const open = ref(false)
</script>

<template>
  <div class="bg-gray-800 text-white p-4 sticky top-0 z-50 w-full">
    <div class="flex justify-between items-center">
      <h1 class="text-lg font-bold">📚 Manual dos Ilementos</h1>
      <button @click="open = !open" class="text-sm underline">
        {{ open ? 'Fechar índice' : 'Abrir índice' }}
      </button>
    </div>
    <div v-if="open" class="mt-4 space-y-1 max-h-64 overflow-auto">
      <div
          v-for="(chapter, i) in props.chapters"
          :key="i"
          @click="emit('select-page', chapter.startPage)"
          class="pl-2 border-l border-white cursor-pointer hover:bg-gray-700"
      >
        Página {{ chapter.startPage + 1 }} — {{ chapter.title }}
      </div>
    </div>
  </div>
</template>




