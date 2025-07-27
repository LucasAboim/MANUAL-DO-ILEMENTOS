<script setup>
import chapters from '~/content/chapters.js'
import { defineEmits } from 'vue'

const emit = defineEmits(['select-page'])
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 mt-6">
    <button
        v-for="(chapter, i) in chapters"
        :key="i"
        @click="$emit('select-page', chapter.startPage)"
        class="bg-white text-black border px-4 py-2 rounded hover:bg-gray-200"
    >
      {{ chapter.title }}
    </button>
  </div>
</template>
