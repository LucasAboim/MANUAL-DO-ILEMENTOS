<template>
  <div
      class="relative w-full max-w-3xl mx-auto bg-white shadow-lg rounded-md p-8 min-h-[400px] flex flex-col justify-center book-page"
  >
    <p class="text-lg leading-relaxed whitespace-pre-line">{{ content }}</p>

    <!-- Botões transparentes em cima do livro -->
    <button
        @click="$emit('prev')"
        class="absolute top-0 left-0 h-full w-1/2 opacity-10 hover:opacity-20 focus:outline-none"
        aria-label="Página anterior"
    ></button>
    <button
        @click="$emit('next')"
        class="absolute top-0 right-0 h-full w-1/2 opacity-10 hover:opacity-20 focus:outline-none"
        aria-label="Próxima página"
    ></button>
  </div>
</template>

<script setup>
defineProps({
  content: String,
})
</script>
