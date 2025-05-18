<script setup>
import { onMounted } from 'vue';
import MainMenu from './components/MainMenu.vue';
import MainGame from './components/MainGame.vue';
import GameOver from './components/GameOver.vue';

import { useGameManagerStore } from '@/stores/gameManagerStore'

const gameManagerStore = useGameManagerStore();

onMounted(async () => {
  await gameManagerStore.getFirstTwoArtists();
  gameManagerStore.setActiveArtists(gameManagerStore.firstArtist, gameManagerStore.secondArtist);
})
</script>

<template>
  <div
    class="w-full h-screen animate-subtle-gradient flex justify-center items-center bg-gradient-to-br from-orange-200 via-green-700 to-blue-900 bg-[length:300%_300%]">
    <!-- Main Menu -->
    <div v-if="gameManagerStore.currentScreen === 'mainMenu'">
      <MainMenu />
    </div>

    <!-- Header -->
    <!-- <Header v-if="gameManagerStore.currentScreen === 'mainGame'" :score="data.score" :volumePercent="data.volumePercent" :isMuted="data.isMuted"
      @toggleMute="data.isMuted = !data.isMuted" @update-volume="data.volumePercent = $event"
      @update-muted="data.isMuted = $event" /> -->

    <!-- Main Game -->
    <MainGame v-if="gameManagerStore.currentScreen === 'activeGame'">
    </MainGame>

    <!-- Game Over -->
    <GameOver v-if="gameManagerStore.currentScreen === 'gameOver'" />
  </div>
</template>

<style scoped>
.result_circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark_circle {
  stroke: #7ac142;
}

.xmark_circle {
  stroke: #c15142;
}

.result_shape {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
}

.checkmark {
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill_checkmark .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.xmark {
  box-shadow: inset 0px 0px 0px #c15142;
  animation: fill_x .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.result_outline {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {

  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill_checkmark {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}

@keyframes fill_x {
  100% {
    box-shadow: inset 0px 0px 0px 30px #c15142;
  }
}

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
