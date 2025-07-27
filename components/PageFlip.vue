<!--PageFlip.vue-->
<script setup>
import { ref, onMounted, watch, defineProps, defineEmits, defineExpose } from 'vue'
import { PageFlip } from 'page-flip'
import chapters from '~/content/chapters.js'

const container = ref(null)
const flip = ref(null)
const currentPage = ref(0)

const emit = defineEmits(['page-changed', 'pages-generated'])
const props = defineProps({
  pageIndex: Number
})

const PAGE_WIDTH = 400
const PAGE_HEIGHT = 600

function splitTextToPages(text, width, height) {
  const containerEl = document.createElement('div')
  containerEl.style.position = 'absolute'
  containerEl.style.visibility = 'hidden'
  containerEl.style.width = width + 'px'
  containerEl.style.fontSize = '18px'
  containerEl.style.lineHeight = '1.6'
  containerEl.style.padding = '24px'
  containerEl.style.boxSizing = 'border-box'
  containerEl.style.whiteSpace = 'normal'
  containerEl.style.wordBreak = 'break-word'
  containerEl.style.fontFamily = 'sans-serif'
  document.body.appendChild(containerEl)

  const words = text.split(' ')
  const pages = []
  let currentText = ''

  for (let i = 0; i < words.length; i++) {
    const testText = currentText ? currentText + ' ' + words[i] : words[i]
    containerEl.innerText = testText

    if (containerEl.offsetHeight > height) {
      pages.push(currentText)
      currentText = words[i]
    } else {
      currentText = testText
    }
  }

  if (currentText) pages.push(currentText)

  document.body.removeChild(containerEl)
  return pages
}

let allPages = []
const chapterMap = []

function createAllPages() {
  allPages = []
  chapterMap.length = 0

  chapters.forEach(chapter => {
    const chapterStartPage = allPages.length

    chapter.pages.forEach(text => {
      const splitPages = splitTextToPages(text, PAGE_WIDTH, PAGE_HEIGHT)
      allPages.push(...splitPages)
    })

    chapterMap.push({
      title: chapter.title,
      startPage: chapterStartPage
    })
  })
}

onMounted(() => {
  createAllPages()

  flip.value = new PageFlip(container.value, {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    size: 'fixed',
    showCover: false,
    singlePage: true,       // <<--- aqui garantimos página única
    mobileScrollSupport: true,
    useMouseEvents: true,
    maxShadowOpacity: 0.5,
    drawShadow: true,
    flippingTime: 500,
    startPage: props.pageIndex || 0
  })

  const pageElements = allPages.map((text, index) => {
    const el = document.createElement('div')
    el.className = 'page'

    // Mostrar título do capítulo se for página inicial
    const chapter = chapterMap.find(c => c.startPage === index)

    el.innerHTML = `
      <h2 class="text-xl font-bold mb-2">
        Página ${index + 1}${chapter ? ` — ${chapter.title}` : ''}
      </h2>
      <p>${text.replace(/\n/g, '<br>')}</p>
    `
    return el
  })

  flip.value.loadFromHTML(pageElements)

  flip.value.on('flip', (e) => {
    currentPage.value = e.data
    emit('page-changed', currentPage.value)
  })

  emit('pages-generated', {
    total: allPages.length,
    chapters: chapterMap
  })
})

// Se o prop mudar, força o flip para a página certa
watch(() => props.pageIndex, (newPage) => {
  if (flip.value && newPage !== currentPage.value) {
    flip.value.flipToPage(newPage)
  }
})

defineExpose({
  flipToPage: (pageNum) => {
    if (flip.value) {
      flip.value.flipToPage(pageNum)
    }
  }
})
</script>

<template>
  <div class="flex justify-center mt-6">
    <div ref="container" class="flip-container" />
  </div>
</template>

<style scoped>
.flip-container {
  width: 400px;
  height: 600px;
}

.page {
  width: 100%;
  height: 100%;
  background-color: white;
  color: black;
  font-size: 18px;
  line-height: 1.6;
  padding: 24px;
  box-sizing: border-box;
  overflow: hidden;
  word-break: break-word;
}
</style>



