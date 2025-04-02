import { ref, computed } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

interface WeatherData {
  temperature: number
  windspeed: number
  weathercode?: number
}

interface DailyForecast {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weathercode: number[]
}

export function useWeather() {
  const weatherStore = useWeatherStore()
  const weatherData = ref<WeatherData | null>(null)
  const dailyForecast = ref<DailyForecast | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWeather = async () => {
    loading.value = true
    error.value = null

    try {
      const { lat, lon } = weatherStore.location
      const unit = weatherStore.unit === 'C' ? 'celsius' : 'fahrenheit'

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=7&temperature_unit=${unit}`)
      const data = await res.json()

      weatherData.value = data.current_weather
      dailyForecast.value = data.daily
    } catch (err) {
      error.value = 'Erro ao obter os dados'
    } finally {
      loading.value = false
    }
  }

  const weatherIcon = computed(() => {
    if (!weatherData.value || weatherData.value.weathercode === undefined) return 'sun'
    const code = weatherData.value.weathercode
    if (code === 0) return 'sun'
    if (code >= 1 && code <= 3) return 'cloud'
    if (code >= 45 && code <= 48) return 'smog'
    if (code >= 51 && code <= 67) return 'cloud-rain'
    if (code >= 71 && code <= 77) return 'snowflake'
    if (code >= 80 && code <= 99) return 'wind'
    return 'sun'
  })

  return { weatherData, dailyForecast, loading, error, fetchWeather, weatherIcon }
}