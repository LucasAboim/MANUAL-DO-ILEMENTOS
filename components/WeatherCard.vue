<script setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

const props = defineProps({
  weatherData: Object,
  loading: Boolean,
  error: String
})

const weatherStore = useWeatherStore()

const temperature = computed(() => {
  if (!props.weatherData) return null
  return weatherStore.unit === 'F' 
    ? (props.weatherData.temperature ) + '°F' 
    : props.weatherData.temperature + '°C'
})
</script>

<template>
  <div class="p-4"> 
    <Card class="max-w-lg mx-auto shadow-lg rounded-lg mt-12 p-6"> 
      <CardHeader class="flex flex-col items-center">
        <CardTitle v-if="!$slots.header" class="text-2xl font-bold">Tempo Atual</CardTitle> 
        <slot name="header"></slot> 
        <WeatherIcon v-if="weatherData" :weatherCode="weatherData.weathercode" />
      </CardHeader>
      <CardContent v-if="!loading && !error && weatherData" class="text-gray-700 text-xl text-center"> 
        <p>
          <FontAwesomeIcon :icon="faTemperatureHalf" class="text-2xl" /> 
          {{ temperature }}
        </p>
        <p v-if="weatherData.windspeed !== undefined"> 
          <FontAwesomeIcon :icon="faWind" class="text-2xl" />
          {{ weatherData.windspeed }} km/h
        </p>
      </CardContent>
      <CardContent v-if="loading" class="text-blue-500 text-center text-xl">
        <p>Carregando...</p>
      </CardContent>
      <CardContent v-if="error" class="text-red-500 text-center text-xl">
        <p>{{ error }}</p>
      </CardContent>
    </Card>
  </div>
</template>