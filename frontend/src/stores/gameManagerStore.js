import { defineStore } from "pinia";
import axios from "axios";

export const useGameManagerStore = defineStore("gameManager", {
  state: () => ({
    currentScreen: "mainMenu",
    currentScore: 0,
    answerCorrect: false,
    answerIncorrect: false,

    firstArtist: null,
    secondArtist: null,
    artistsList: [],
  }),
  actions: {
    startFirstGame() {
      this.currentScreen = "activeGame";
      this.currentScore = 0;
      this.answerCorrect = false;
      this.answerIncorrect = false;
    },
    async startNewGame() {
      this.currentScreen = "activeGame";
      this.currentScore = 0;
      this.answerCorrect = false;
      this.answerIncorrect = false;

      this.artistsList.shift();
      this.artistsList.shift();

      this.setActiveArtists(this.artistsList[0], this.artistsList[1]);
      await this.getArtist(); // fetch until we have 5
    },
    endGame() {
      this.currentScreen = "gameOver";
      this.gameActive = false;
    },
    setActiveArtists(artist1, artist2) {
      this.firstArtist = artist1;
      this.secondArtist = artist2;
    },
    incrementScore() {
      this.currentScore += 1;
    },
    returnToMenu() {
      this.currentScreen = "mainMenu";
      this.firstArtist = null;
      this.secondArtist = null;
      this.currentScore = 0;
      this.gameActive = false;
    },
    shiftArtists() {
      // Remove first artist
      this.artistsList.shift();

      // After shift, [0] becomes new first, [1] becomes new second
      this.firstArtist = this.artistsList[0] || null;
      this.secondArtist = this.artistsList[1] || null;
    },
    playSound(path) {
      const audio = new Audio(path);
      audio.play();
    },
    guess(direction) {
      const [artistOne, artistTwo] = this.artistsList;
      const a1 = parseFloat(artistOne.listeners.replace(/,/g, ""));
      const a2 = parseFloat(artistTwo.listeners.replace(/,/g, ""));

      const correct =
        direction === "higher"
          ? a2 >= a1
          : direction === "lower"
          ? a2 <= a1
          : false;

      if (correct) {
        this.currentScore++;
        this.answerCorrect = true;
        this.playSound("/sounds/level-up-short.mp3");

        setTimeout(() => {
          this.shiftArtists();
          this.answerCorrect = false;
        }, 2000);

        if (this.artistsList.length < 5) this.getArtist();
      } else {
        this.answerIncorrect = true;
        this.playSound("/sounds/meep-merp.mp3");
        setTimeout(() => {
          this.currentScreen = "gameOver";
        }, 4000);
      }
    },
    async getArtist() {
      while (this.artistsList.length < 5) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/getArtist`
          );
          this.artistsList.push(response.data);
        } catch (error) {
          console.error("Failed to fetch artist:", error);
          break; // prevent infinite loop
        }
      }
    },
    async getFirstTwoArtists() {
      while (this.artistsList.length < 2) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/getArtists`
          );

          // spread them into the array
          this.artistsList.push(...response.data);
        } catch (error) {
          console.error("Failed to fetch artist:", error);
          break;
        }
      }

      if (this.artistsList.length >= 2) {
        this.firstArtist = this.artistsList[0];
        this.secondArtist = this.artistsList[1];
      } else {
        console.error("Not enough artists fetched.");
      }
    },
  },
});
