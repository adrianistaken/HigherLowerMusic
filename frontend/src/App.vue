<script setup>
import { onMounted } from 'vue';
import MainMenu from './components/MainMenu.vue';
import MainGame from './components/MainGame.vue';
import GameOver from './components/GameOver.vue';
import Header from './components/Header.vue';
import GuessCircle from './components/GuessCircle.vue';

import { useGameManagerStore } from '@/stores/gameManagerStore'

const gameManagerStore = useGameManagerStore();

onMounted(async () => {
  await gameManagerStore.getFirstTwoArtists();
  gameManagerStore.setActiveArtists(gameManagerStore.firstArtist, gameManagerStore.secondArtist);
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden md:static md:overflow-auto
         w-full h-screen animate-subtle-gradient flex justify-center items-center 
         bg-gradient-to-br from-orange-200 via-green-700 to-blue-900 
         bg-[length:300%_300%] font-[Roboto]">
    <!-- Main Menu -->
    <div v-if="gameManagerStore.currentScreen === 'mainMenu'">
      <MainMenu />
    </div>

    <!-- Header -->
    <Header v-if="gameManagerStore.currentScreen === 'activeGame'" :score="gameManagerStore.currentScore" />
    <!-- Guess Circle -->
    <GuessCircle v-if="gameManagerStore.currentScreen === 'activeGame'" />

    <!-- Main Game -->
    <MainGame v-if="gameManagerStore.currentScreen === 'activeGame'">
    </MainGame>

    <!-- Game Over -->
    <GameOver v-if="gameManagerStore.currentScreen === 'gameOver'" />
  </div>
</template>

<style scoped>
@keyframes subtleGradientShift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-subtle-gradient {
  animation: subtleGradientShift 30s ease infinite;
}
</style>
