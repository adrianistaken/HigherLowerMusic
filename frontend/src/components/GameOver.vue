<script setup>
import { computed } from 'vue'

import { useGameManagerStore } from '@/stores/gameManagerStore'
const gameManagerStore = useGameManagerStore();


const message = computed(() => {
    const score = gameManagerStore.currentScore
    const highScore = gameManagerStore.highScore
    const delta = highScore - score

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

    if (score === 0) {
        return random([
            "You did literally nothing. Impressive.",
            "It's okay. Everyone starts somewhere. Like, way down here.",
            "Don't worry, the button still works.",
            "That was... rhythmically unfortunate.",
        ])
    }

    if (score === 1) {
        return random([
            "One point! You technically played!",
            "Just a toe in the water, huh?",
            "The game has begun... and ended.",
            "One-hit wonder?",
            "You dropped the mic — a little too early.",
            "You guessed once and the band broke up."
        ])
    }

    if (score < 5) {
        return random([
            "A humble beginning.",
            "Still warmer than zero.",
            "You're building suspense for the comeback story.",
            "Not quite platinum, but you're on the charts.",
        ])
    }

    if (score >= 5 && score < 10) {
        return random([
            "Respectable. Kinda.",
            "You're on the scoreboard!",
            "Hey, not bad at all.",
            "You know your way around a playlist.",
            "Respectable ear — maybe you moonlight as a DJ?",
            "You've definitely read a few Genius lyrics pages."
        ])
    }

    if (score >= 10 && score < 20) {
        return random([
            "Okay, you've clearly played before.",
            "Solid. We see you.",
            "That's a veteran score right there.",
            "Okay music brain, we see you.",
            "You're basically a walking Discover Weekly.",
            "If this were music class, you're getting an A-minus."
        ])
    }

    if (score >= 20) {
        if (score === highScore) {
            return random([
                "🔥 New personal best! You're a machine.",
                "That's a new high score! Screenshot or it didn't happen.",
                "You beat yourself. In a good way.",
                "🎉 New high score! You've out-playlisted your past self.",
                "That's the sound of a record breaking. You crushed it!",
                "Turn the volume up — this was your best run yet!"
            ])
        } else if (delta <= 2) {
            return random([
                "So close to your record! Pain.",
                "Just a couple away from glory.",
                "A heartbreakingly close run...",
                "Just a few notes away from greatness.",
                "So close to topping your personal charts.",
            ])
        } else {
            return random([
                "You're elite tier. Probably.",
                "Greatness suits you.",
                "Put that score on your résumé.",
                "Absolute chart-topper energy.",
                "You've got the musical IQ of a record store clerk from 2006.",
            ])
        }
    }

    return "You broke the scoring system. Congrats?";
})
</script>

<template>
    <!-- Hero section -->
    <div class="hero bg-base-200/0 min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-4xl">Your score is:</h1>
                <p class="text-6xl font-bold py-6">{{ gameManagerStore.currentScore }}</p>

                <p class="text-lg italic text-neutral-content mb-6">{{ message }}</p>

                <button class="btn btn-lg btn-outline w-50" @click="gameManagerStore.startNewGame()">Play
                    Again</button>

                <div class="flex flex-col items-center justify-center text-center">
                    <p class="text-md mt-10 text-neutral-content">🎤
                        <a href="https://your-notion-form-link" target="_blank" class="underline"> Ideas,
                            feedback, bugs</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
