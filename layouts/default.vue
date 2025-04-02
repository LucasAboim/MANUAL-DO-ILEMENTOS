<template>
  <div class="min-h-screen bg-[#fff6e4] text-foreground ">

    <header class="bg-[#bc8e00] text-white relative ">
      <div class="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center p-8 relative text-center">

        <NuxtLink to="/" class="text-3xl font-bold flex items-center space-x-2 ">
        </NuxtLink>

        <nav class="hidden md:flex space-x-6 absolute left-1/2 -translate-x-1/2">
          <NuxtLink to="/" class="hover:text-gray-300 transition flex items-center space-x-2 text-xl">
            <font-awesome-icon :icon="['fas', 'house']" class="text-2xl" />
            <span>Início</span>
          </NuxtLink>
          <NuxtLink to="/settings" class="hover:text-gray-300 transition flex items-center space-x-2 text-xl">
            <font-awesome-icon :icon="['fas', 'cog']" class="text-2xl" />
            <span>Configurações</span>
          </NuxtLink>
        </nav>

        <!-- Botão do hambrugo -->
        <button @click="menuOpen = !menuOpen" class="md:hidden focus:outline-none">
          <font-awesome-icon :icon="menuOpen ? ['fas', 'times'] : ['fas', 'bars']" />
        </button>
      </div>

      <!-- telemovel -->
      <nav v-if="menuOpen" class="md:hidden bg-[#dea700] text-center py-2 space-y-2 ">
        <NuxtLink to="/" class="block hover:bg-[#d19f00] p-2 flex justify-center items-center space-x-2 text-xl">
          <font-awesome-icon :icon="['fas', 'house']" class="text-2xl" />
          <span>Início</span>
        </NuxtLink>
        <NuxtLink to="/settings" class="block hover:bg-[#d19f00] p-2 flex justify-center items-center space-x-2 text-xl">
          <font-awesome-icon :icon="['fas', 'cog']" class="text-2xl" />
          <span>Configurações</span>
        </NuxtLink>
      </nav>
      
    </header>

    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faCog, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHouse, faCog, faBars, faTimes);

const menuOpen = ref(false);
</script>
