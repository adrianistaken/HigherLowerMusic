<script setup>
import ArtistCard from './ArtistCard.vue';
import { useGameManagerStore } from '@/stores/gameManagerStore'
const gameManagerStore = useGameManagerStore();
</script>

<template>
    <div class="w-full min-h-screen">
        <div class="flex flex-col md:flex-row h-screen">
            <div class="flex-1">
                <ArtistCard :artist="gameManagerStore.firstArtist" :showListeners="true" />
            </div>
            <div class="flex-1">
                <ArtistCard :artist="gameManagerStore.secondArtist" :showListeners="false" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
