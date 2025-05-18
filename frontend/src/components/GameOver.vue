<script setup>
import { useGameManagerStore } from '@/stores/gameManagerStore'
const gameManagerStore = useGameManagerStore();
</script>

<template>
    <div>
        <!-- Hero section -->
        <div class="hero bg-base-200/0 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Game Over</h1>
                    <p class="py-6">You scored {{ gameManagerStore.currentScore }} points!</p>
                    <button class="btn btn-primary mt-4" @click="gameManagerStore.startNewGame()">Play Again</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
