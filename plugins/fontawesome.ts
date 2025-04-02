import { library } from '@fortawesome/fontawesome-svg-core'
import { faSun, faCloud, faCloudRain, faSnowflake, faSmog, faWind } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSun, faCloud, faCloudRain, faSnowflake, faSmog, faWind)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
