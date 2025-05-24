<script setup>
import { useGameManagerStore } from '@/stores/gameManagerStore'
const gameManagerStore = useGameManagerStore();
</script>

<template>
    <div>
        <!-- Hero section -->
        <div class="hero bg-base-200/0 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md leading-none">
                    <h1 class="text-[50px] font-bold text-red-400">
                        <spand class="text-green-400">HIGHER</spand> LOWER
                    </h1>
                    <h1 class="text-[118px] font-bold">MUSIC</h1>
                    <h2 class="text-2xl font-bold mt-3">Who has more listeners?</h2>
                    <p class="py-6 text-xl">
                        Guess which music artist has more monthly Spotify listeners!
                    </p>
                    <button class="btn btn-primary p-6 text-lg" @click="gameManagerStore.startFirstGame()">Start
                        Guessing</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
