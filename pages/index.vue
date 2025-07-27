<!--index.vue-->
<script setup>
import { ref } from 'vue'
import TopBar from '~/components/TopBar.vue'
import PageFlip from '~/components/PageFlip.vue'

const currentPage = ref(0)
const chapters = ref([])
const totalPages = ref(0)

const flipRef = ref(null)

function goToPage(pageNum) {
  currentPage.value = pageNum
  flipRef.value?.flipToPage(pageNum)
}

function onPageChanged(newPage) {
  currentPage.value = newPage
}

function onPagesGenerated(data) {
  totalPages.value = data.total
  chapters.value = data.chapters
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-black flex flex-col items-center">
    <TopBar :chapters="chapters" @select-page="goToPage" />
    <PageFlip
        ref="flipRef"
        :pageIndex="currentPage"
        @page-changed="onPageChanged"
        @pages-generated="onPagesGenerated"
    />
    <div class="mt-4 mb-8 flex justify-center gap-2">
      <input
          type="number"
          v-model.number="currentPage"
          min="0"
          :max="totalPages - 1"
          class="w-16 p-1 border rounded text-center"
      />
      <span>/ {{ totalPages }}</span>
    </div>
  </div>
</template>

