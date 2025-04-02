<script setup>
import { useWeatherStore } from '@/stores/weatherStore'
import { ref } from 'vue'
import { Switch } from './@/components/ui/switch'

const weatherStore = useWeatherStore()
const cityInput = ref('')
const isEditing = ref(false)

async function updateCity() {
  if (cityInput.value.trim() !== '') {
    await weatherStore.setLocation(cityInput.value.trim())
    isEditing.value = false
  }
}
</script>

<template>
  <div class="text-center p-8">
    <h1 class="text-3xl font-bold">Configurações</h1>

    <label class="block mt-8 text-2xl">Escolhe uma cidade:</label>
    <div class="flex justify-center mt-6">
      <input
        v-if="isEditing"
        v-model="cityInput"
        @keyup.enter="updateCity"
        @blur="isEditing = false"
        placeholder="Digite a cidade e pressione Enter"
        class="mt-2 p-2 border rounded text-center w-78"
      />
      <p
        v-else
        class="mt-2 p-2 border rounded text-center text-gray-700 cursor-pointer w-48"
        @click="isEditing = true; cityInput = weatherStore.location.name"
      >
        {{ weatherStore.location.name }}
      </p>
    </div>

    <label class="block mt-6">Unidade de temperatura:</label>
    <div class="flex justify-center items-center gap-4 mt-2">
      <span>C</span>
      <Switch v-model:checked="weatherStore.unit" @update:checked="weatherStore.setUnit($event ? 'F' : 'C')" />
      <span>F</span>
    </div>
  </div>
</template>