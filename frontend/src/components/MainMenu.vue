<template>
    <div>
        <!-- Hero section -->
        <div class="hero bg-base-200/0 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Higher Lower Music</h1>
                    <p class="py-6">
                        Guess if the second artist has a higher or lower monthly listener count than the
                        first artist! (based on Spotify's updated monthly listener count)
                    </p>
                    <button class="btn btn-primary" @click="$emit('startGame')">Start Guessing</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>