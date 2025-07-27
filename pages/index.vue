<script setup>
import { ref, computed } from 'vue'
import { histories } from '../data/histories.js'
import BookPage from '../components/BookPage.vue'

const totalPages = histories.reduce((acc, h) => acc + h.pages.length, 0)
const currentPage = ref(0)

// Para mapear página atual para história e página interna
function getHistoryByPage(page) {
  let count = 0
  for (let i = 0; i < histories.length; i++) {
    const h = histories[i]
    if (page < count + h.pages.length) {
      return { historyIndex: i, pageIndex: page - count }
    }
    count += h.pages.length
  }
  return null
}

const current = computed(() => getHistoryByPage(currentPage.value))
const currentContent = computed(() => {
  if (!current.value) return ''
  return histories[current.value.historyIndex].pages[current.value.pageIndex]
})

const currentTitle = computed(() => {
  if (!current.value) return ''
  // Se for a primeira página da história, mostramos o título
  return current.value.pageIndex === 0 ? histories[current.value.historyIndex].title : ''
})

// Funções para mudar página
function nextPage() {
  if (currentPage.value < totalPages - 1) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}

// Menu do índice
const showIndex = ref(false)
function toggleIndex() {
  showIndex.value = !showIndex.value
}

function goToPage(page) {
  currentPage.value = page
  showIndex.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center p-4 relative">

    <!-- Informação da página e título no topo esquerdo -->
    <div class="absolute top-4 left-4 text-gray-700 font-semibold">
      <div>Página: {{ currentPage + 1 }} / {{ totalPages }}</div>
      <div v-if="currentTitle" class="text-xl mt-1">{{ currentTitle }}</div>
    </div>

    <!-- Botão índice no topo direito -->
    <button
        @click="toggleIndex"
        class="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
    >
      Índice
    </button>

    <!-- Menu índice -->
    <transition name="fade">
      <div
          v-if="showIndex"
          class="absolute top-12 right-4 w-64 bg-white shadow-lg rounded border z-50 max-h-96 overflow-y-auto"
      >
        <ul>
          <li
              v-for="(history, index) in histories"
              :key="index"
              class="border-b last:border-none"
          >
            <button
                @click="goToPage(histories.slice(0, index).reduce((acc, h) => acc + h.pages.length, 0))"
                class="w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
            >
              {{ histories.slice(0, index).reduce((acc, h) => acc + h.pages.length, 0) + 1 }} - {{ history.title }}
            </button>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Componente do livro -->
    <BookPage
        :content="currentContent"
        @next="nextPage"
        @prev="prevPage"
        class="mt-16 w-full max-w-3xl"
    />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
