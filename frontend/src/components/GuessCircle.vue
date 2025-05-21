<script setup>
import { useGameManagerStore } from '@/stores/gameManagerStore'
const gameManagerStore = useGameManagerStore();
</script>

<template>
    <div class="mx-auto my-4 h-10 w-full flex items-center justify-center absolute z-10">
        <!-- Green correct icon -->
        <svg v-if="gameManagerStore.answerCorrect" class="result_shape checkmark m-auto absolute z-20"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="result_circle checkmark_circle" cx="26" cy="26" r="25" fill="none" />
            <path class="result_outline" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <!-- Red incorrect icon -->
        <svg v-if="gameManagerStore.answerIncorrect" class="result_shape xmark m-auto absolute z-20"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="result_circle xmark_circle" cx="26" cy="26" r="25" fill="none" />
            <path class="result_outline" fill="none" d="M16 16 36 36 M36 16 16 36" />
        </svg>
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
    width: 60px;
    height: 60px;
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
