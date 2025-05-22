<script setup>
import { useGameManagerStore } from '@/stores/gameManagerStore'
const gameManagerStore = useGameManagerStore();

const props = defineProps({
    artist: Object,
    showListeners: Boolean
})
</script>

<template>
    <div>
        <!-- Overlay content centered -->
        <div class="absolute inset-0 flex flex-col justify-center items-center text-white p-4 text-center">
            <div class="absolute inset-0 bg-black/50"></div> <!-- darker background -->

            <!-- Content on top of dark overlay -->
            <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold drop-shadow-md mb-2">{{ props.artist.info?.name }}</h2>
                <h3 class="text-2xl md:text-2xl drop-shadow-sm mb-2">has</h3>
                <div v-if="props.showListeners">
                    <p
                        class="text-4xl md:text-5xl font-semibold flex items-center justify-center gap-2 mb-2 drop-shadow text-green-400">
                        {{ props.artist.listeners?.toLocaleString() }}
                    </p>
                    <p class="flex items-center justify-center gap-2 text-lg md:text-2xl drop-shadow-sm">
                        monthly listeners
                        <a :href="artist.info?.external_urls.spotify" class="tooltip" data-tip="Listen on Spotify"
                            target="_blank" rel="noopener noreferrer">
                            <!-- Spotify Logo -->
                            <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="-20 50 250 100">
                                <path
                                    d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"
                                    fill="#1ed660" />
                            </svg>
                        </a>
                    </p>
                </div>
                <div v-else>
                    <div v-if="!gameManagerStore.answerCorrect && !gameManagerStore.answerIncorrect"
                        class="flex flex-col gap-4 justify-center mt-3 items-center">
                        <div class="flex flex-col gap-4">
                            <button class="btn btn-lg btn-outline w-50" @click="gameManagerStore.guess('higher')">Higher
                                <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="#58df61">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                                            fill="#58df61" />
                                    </g>
                                </svg></button>
                            <button class="btn btn-lg btn-outline w-50" @click="gameManagerStore.guess('lower')">Lower
                                <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="#ff7a7a" stroke-width="1.152">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                                            fill="#ff7a7a" />
                                    </g>
                                </svg></button>
                        </div>
                        <p class="text-lg md">monthly listeners than {{ gameManagerStore.firstArtist.info?.name }}</p>
                    </div>
                    <div v-else>
                        <div>
                            <p
                                class="text-4xl md:text-5xl font-semibold flex items-center justify-center gap-2 mb-2 drop-shadow text-green-400">
                                {{ props.artist.listeners?.toLocaleString() }}
                            </p>
                            <p class="flex items-center justify-center gap-2 text-lg md:text-2xl drop-shadow-sm">
                                monthly listeners
                                <a v-if="artist.info.name !== gameManagerStore.artistsList[1].info?.name"
                                    :href="artist.info?.external_urls.spotify" class="tooltip"
                                    data-tip="Listen on Spotify" target="_blank" rel="noopener noreferrer">
                                    <!-- Spotify Logo -->
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25"
                                        viewBox="-20 50 250 100">
                                        <path
                                            d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"
                                            fill="#1ed660" />
                                    </svg>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div v-if="gameManagerStore.answerCorrect">✅ Correct!</div>
            <div v-if="gameManagerStore.answerIncorrect">❌ Wrong!</div> -->
        </div>
    </div>
</template>

<style scoped></style>
