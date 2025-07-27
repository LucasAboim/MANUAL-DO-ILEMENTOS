<script setup>
import { onMounted, ref } from 'vue'
import { PageFlip } from 'page-flip'
import chapters from '~/content/chapters.js'

const container = ref(null)

onMounted(() => {
  const flip = new PageFlip(container.value, {
    width: 400,
    height: 600,
    size: 'stretch',
    maxShadowOpacity: 0.5,
    showCover: false,
    mobileScrollSupport: true
  })

  const pages = chapters.flatMap(ch => ch.pages)

  const pageElements = pages.map((page, index) => {
    const el = document.createElement('div')
    el.className = 'page bg-white text-black p-6 text-lg leading-relaxed'
    el.innerHTML = `<h2 class="text-xl font-bold mb-2">Página ${index + 1}</h2><p>${page}</p>`
    return el
  })

  flip.loadFromHTML(pageElements)
})
</script>

<template>
  <div class="flex justify-center mt-6">
    <div ref="container" class="shadow-xl border" />
  </div>
</template>
