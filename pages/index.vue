<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { histories } from '../data/histories.js'
import BookPage from '../components/BookPage.vue'

const totalPages = histories.reduce((acc, h) => acc + h.pages.length, 0)
const currentPage = ref(0)

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
  return current.value.pageIndex === 0 ? histories[current.value.historyIndex].title : ''
})

function nextPage() {
  if (currentPage.value < totalPages - 1) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}

const showIndex = ref(false)
function toggleIndex() {
  showIndex.value = !showIndex.value
}

function goToPage(page) {
  currentPage.value = page
  showIndex.value = false
}

function onClickOutside(event) {
  const indexMenu = document.getElementById('index-menu')
  const indexButton = document.getElementById('index-button')
  if (
      showIndex.value &&
      indexMenu &&
      !indexMenu.contains(event.target) &&
      indexButton &&
      !indexButton.contains(event.target)
  ) {
    showIndex.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  // Inicializa tema baseado no localStorage
  if (process.client) {
    const saved = localStorage.getItem('darkMode')
    darkMode.value = saved === 'true'
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

// Dark mode toggle
const darkMode = ref(false)

// Sincroniza classe dark no <html> sempre que mudar darkMode
watch(darkMode, (val) => {
  if (process.client) {
    if (val) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center p-4 relative">

    <!-- Página e título -->
    <div class="absolute top-4 left-4 text-gray-700 dark:text-gray-300 font-semibold max-w-xs">
      <div>Página: {{ currentPage + 1 }} / {{ totalPages }}</div>
      <div
          :class="{
          'block mt-1 text-xl break-words': currentTitle.length > 22,
          'inline-block ml-2 text-xl': currentTitle.length <= 22
        }"
      >
        {{ currentTitle }}
      </div>
    </div>

    <!-- Switch tema -->
    <div class="absolute top-4 right-24 flex items-center space-x-2 select-none">
      <label for="dark-toggle" class="text-gray-700 dark:text-gray-300 font-semibold cursor-pointer">Tema</label>
      <input
          type="checkbox"
          id="dark-toggle"
          class="cursor-pointer"
          v-model="darkMode"
      />
    </div>

    <!-- Botão índice -->
    <button
        id="index-button"
        @click="toggleIndex"
        class="absolute top-4 right-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none"
    >
      Índice
    </button>

    <!-- Menu índice -->
    <transition name="fade">
      <div
          v-if="showIndex"
          id="index-menu"
          class="absolute top-12 right-4 w-64 bg-white dark:bg-gray-800 shadow-lg rounded border z-50 max-h-96 overflow-y-auto"
      >
        <ul>
          <li
              v-for="(history, index) in histories"
              :key="index"
              class="border-b last:border-none border-gray-300 dark:border-gray-600"
          >
            <button
                @click="goToPage(histories.slice(0, index).reduce((acc, h) => acc + h.pages.length, 0))"
                class="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none dark:text-gray-200"
            >
              {{ histories.slice(0, index).reduce((acc, h) => acc + h.pages.length, 0) + 1 }} - {{ history.title }}
            </button>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Componente livro -->
    <BookPage
        :content="currentContent"
        @next="nextPage"
        @prev="prevPage"
        class="mt-16 w-full max-w-3xl bg-white dark:bg-gray-800 dark:text-white rounded shadow p-6"
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
