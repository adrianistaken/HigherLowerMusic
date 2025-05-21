<script setup>
import ArtistCard from './ArtistCard.vue';
import { useGameManagerStore } from '@/stores/gameManagerStore'
const gameManagerStore = useGameManagerStore();
</script>

<template>
    <TransitionGroup name="slide" tag="div" class="absolute w-full h-full flex overflow-hidden md:flex-row flex-col">
        <div v-for="(artist, index) in gameManagerStore.artistsList" :key="artist.info.id"
            class="w-full md:w-1/2 md:h-full h-1/2 flex-shrink-0">
            <ArtistCard :artist="artist" :showListeners="index === 0" />
        </div>
    </TransitionGroup>
</template>

<style scoped>
.slide-move {
    transition: transform 0.5s ease;
}

.slide-enter-from {
    transform: translateX(100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}

.slide-leave-active {
    position: absolute;
}
</style>
