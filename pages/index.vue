<script setup>
import { useWeatherStore } from '@/stores/weatherStore'
import { useWeather } from '@/composables/useWeather'
import { computed, onMounted, onUnmounted } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'

const weatherStore = useWeatherStore()
const { weatherData, dailyForecast, loading, error, fetchWeather } = useWeather()

onMounted(() => {
  fetchWeather()
  const interval = setInterval(fetchWeather, 20000)
  onUnmounted(() => clearInterval(interval))
})


const formattedLocation = computed(() => {
  return weatherStore.location.name
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()) 
})

const getWeekday = (dateString) => {
  const date = new Date(dateString + 'T00:00:00') 
  return date.toLocaleDateString('pt-PT', { weekday: 'long' })
}
</script>

<template>
  <div class="text-center p-6">
    <h2 class="text-4xl font-semibold">{{ formattedLocation }}</h2>
    
    <!-- Card para o tempo atual -->
    <WeatherCard :weatherData="weatherData" :loading="loading" :error="error" />
    
    <!-- Cards para os próximos 7 dias -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <WeatherCard v-for="(day, index) in dailyForecast?.time.slice(1)" :key="index"
                   :weatherData="{ temperature: dailyForecast.temperature_2m_max[index + 1], weathercode: dailyForecast.weathercode[index + 1] }"
                   :loading="loading" :error="error">
        <template v-slot:header>
          <h3 class="text-lg font-semibold">{{ getWeekday(day) }}</h3>
        </template>
      </WeatherCard>
    </div>
  </div>
</template>