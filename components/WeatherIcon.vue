<template>
    <font-awesome-icon :icon="iconClass" class="text-5xl" />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    weatherCode: Number
  })
  
  const iconClass = computed(() => {
    if (!props.weatherCode) return 'fa-solid fa-sun'
    if (props.weatherCode === 0) return 'fa-solid fa-sun'
    if (props.weatherCode >= 1 && props.weatherCode <= 3) return 'fa-solid fa-cloud'
    if (props.weatherCode >= 45 && props.weatherCode <= 48) return 'fa-solid fa-smog'
    if (props.weatherCode >= 51 && props.weatherCode <= 67) return 'fa-solid fa-cloud-rain'
    if (props.weatherCode >= 71 && props.weatherCode <= 77) return 'fa-solid fa-snowflake'
    if (props.weatherCode >= 80 && props.weatherCode <= 99) return 'fa-solid fa-wind'
  
    return 'fa-solid fa-sun'
  })
  </script>
  
  <style scoped>
  i {
    font-size: 2rem;
  }
  </style>
  