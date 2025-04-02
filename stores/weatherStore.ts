import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
  const defaultUnit = 'C'
  const defaultCity = { name: 'Aveiro', lat: 40.64, lon: -8.65 }

  const storedCity = useLocalStorage('weather-location', defaultCity)
  const storedUnit = useLocalStorage('weather-unit', defaultUnit)

  const unit = computed({
    get: () => storedUnit.value,
    set: (newUnit: string) => {
      storedUnit.value = newUnit
    }
  })

  const location = computed({
    get: () => storedCity.value,
    set: (newCity) => {
      storedCity.value = newCity
    }
  })

  function setUnit(newUnit: string) {
    storedUnit.value = newUnit
  }

  async function setLocation(cityName: string) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`)
      const data = await res.json()

      if (data.length > 0) {
        const city = {
          name: cityName,
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        }
        storedCity.value = city
      } else {
        console.error('Cidade não encontrada')
      }
    } catch (error) {
      console.error('Erro ao buscar localização', error)
    }
  }

  return { location, unit, setLocation, setUnit }
})
