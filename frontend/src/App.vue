<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { reactive, ref, onMounted, computed } from 'vue';
import ArtistCard from './components/ArtistCard.vue';
import Header from './components/Header.vue';
import MainMenu from './components/MainMenu.vue';
import axios from 'axios';

const data = reactive({
  artistsList: [],
  storedArtist: {},
  gameActive: false,
  showGameOverMessage: false,
  score: 0,
  answerCorrect: false,
  answerIncorrect: false,
})

const showListeners = computed(() => {
  if (data.showGameOverMessage || data.answerCorrect) return true;
  else return false;
});

onMounted(async () => {
  await axios({
    url: `${import.meta.env.VITE_API_URL}/getArtists`,
    method: 'GET',
  })
    .then((response) => {
      data.artistsList = response.data;
    })
})

const getArtist = async () => {
  if (data.artistsList.length < 5) {
    await axios({
      url: `${import.meta.env.VITE_API_URL}/getArtist`,
      method: 'GET',
    })
      .then(function (response) {
        data.artistsList.push(response.data);
        if (data.artistsList.length < 5) getArtist();
      });
  }
}

const startGame = async () => {
  data.gameActive = true;
  getArtist();
}

const newGame = async () => {
  data.gameActive = true;
  data.showGameOverMessage = false;
  data.answerCorrect = false;
  data.answerIncorrect = false;
  data.score = 0;
  data.artistsList.shift();
  data.artistsList.shift();
  getArtist();
}

const answerHigher = () => {
  var artistOneListeners = parseFloat(data.artistsList[0].listeners.replace(/,/g, ''));
  var artistTwoListeners = parseFloat(data.artistsList[1].listeners.replace(/,/g, ''));

  if (artistTwoListeners > artistOneListeners || artistOneListeners === artistTwoListeners) {
    data.score++;
    data.answerCorrect = true;

    setTimeout(() => {
      data.artistsList.shift();
      data.answerCorrect = false;
    }, 2000)

    if (data.artistsList.length < 5) getArtist();
  } else {
    data.answerIncorrect = true;
    setTimeout(() => {
      data.showGameOverMessage = true;
    }, 2000)
  }
}

const answerLower = () => {
  var artistOneListeners = parseFloat(data.artistsList[0].listeners.replace(/,/g, ''));
  var artistTwoListeners = parseFloat(data.artistsList[1].listeners.replace(/,/g, ''));

  if (artistTwoListeners < artistOneListeners || artistOneListeners === artistTwoListeners) {
    data.score++;
    data.answerCorrect = true;

    setTimeout(() => {
      data.artistsList.shift();
      data.answerCorrect = false;
    }, 2000)

    if (data.artistsList.length < 5) getArtist();
  } else {
    data.answerIncorrect = true;
    setTimeout(() => {
      data.showGameOverMessage = true;
    }, 1800)

  }
}

defineExpose({ showListeners });
</script>

<template>
  <div>
    <!-- Intro component -->
    <div v-if="!data.gameActive" class="">
      <MainMenu @startGame="startGame" />
    </div>

    <Header v-if="data.gameActive" :score="data.score" />

    <!-- Main game - artists info section -->
    <div v-if="data.gameActive" class="">

      <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content text-center">
          <div class="max-w-5xl">
            <div class="flex w-full">
              <div class="card bg-base-300 rounded-box grid grow place-items-center p-6">
                <ArtistCard v-if="data.gameActive" :artist="data.artistsList[0]" :showListeners="true" />
              </div>
              <div class="divider divider-horizontal mx-10">

                <div class="mx-auto my-4 h-10 w-full flex items-center justify-center">
                  <div class="h-[.5px] w-full bg-neutral-500"></div>
                  <div class="bg-neutral-900 rounded-full z-10 w-10 h-10 absolute border-neutral-500 border-[1px]">
                  </div>

                  <!-- Green correct icon -->
                  <svg v-if="data.answerCorrect" class="result_shape checkmark m-auto absolute z-20"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="result_circle checkmark_circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="result_outline" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                  <!-- Red incorrect icon -->
                  <svg v-if="data.answerIncorrect" class="result_shape xmark m-auto absolute z-20"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="result_circle xmark_circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="result_outline" fill="none" d="M16 16 36 36 M36 16 16 36" />
                  </svg>
                </div>

              </div>
              <div class="card bg-base-300 rounded-box grid grow place-items-center p-6">
                <ArtistCard v-if="data.gameActive" :artist="data.artistsList[1]" :showListeners="showListeners" />
              </div>
            </div>
            <div class="mt-5">
              <!-- Higher/Lower guess buttons -->
              <p v-if="!data.showGameOverMessage">{{ data.artistsList[1].info.name }}'s monthly listeners is higher or
                lower
                than
                {{ data.artistsList[0].info.name }}..</p>
              <div v-if="!data.showGameOverMessage" class="flex gap-4 justify-center mt-3">
                <button class="btn btn-outline btn-success disabled:opacity-50" @click="answerHigher"
                  :disabled="data.answerIncorrect || data.answerCorrect">Higher</button>
                <button class="btn btn-outline btn-error disabled:opacity-50" @click="answerLower"
                  :disabled="data.answerIncorrect || data.answerCorrect">Lower</button>
              </div>
            </div>
            <!-- Start/new game buttons -->
            <div>
              <!-- Game over message -->
              <h3 v-if="data.showGameOverMessage" class="text-[#c15142] font-bold">Game Over</h3>
              <button v-if="data.showGameOverMessage" class="btn btn-success disabled:opacity-50 mt-3"
                @click="newGame">New Game</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#artist-two {
  margin: auto
}

@media (min-width: 640px) {
  #artist-two {
    margin: none;
  }
}

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
</style>
