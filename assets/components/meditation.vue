<template>
  <section id="meditation" class="bg-bone p-8 text-smoky-black">
    <div class="flex items-center">
      <div class="h-[1px] w-full bg-olive-drab"></div>
      <h2
        class="my-8 w-full text-center text-3xl font-bold uppercase text-olive-drab"
      >
        успокойте свой ум
      </h2>
      <div class="h-[1px] w-full bg-olive-drab"></div>
    </div>
    <div
      class="my-10 grid items-center gap-x-2 gap-y-6 lg:mx-[10%] lg:my-28 lg:grid-cols-2 lg:gap-y-3"
    >
      <div
        class="flex flex-row items-center justify-center gap-2 text-[120px] font-bold leading-tight text-smoky-black"
      >
        <!-- Часы -->
        <div class="flex flex-col items-center">
          <button
            @click="!isRunning && (hours > 1 ? (hours = 0) : hours++)"
            class="h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-olive-drab border-l-transparent border-r-transparent"
            :class="{ hidden: isRunning }"
          ></button>
          <input
            type="number"
            v-model.number="hours"
            :disabled="isRunning"
            min="0"
            max="2"
            class="w-32 bg-transparent text-center text-[120px] font-bold outline-none"
            @input="hours = hours < 0 ? 0 : hours > 2 ? 2 : hours"
          />
          <button
            @click="!isRunning && (hours > 0 ? hours-- : (hours = 2))"
            class="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-olive-drab"
            :class="{ hidden: isRunning }"
          ></button>
        </div>
        <div>:</div>
        <!-- Минуты -->
        <div class="flex flex-col items-center">
          <button
            @click="!isRunning && (minutes > 58 ? (minutes = 0) : minutes++)"
            class="h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-olive-drab border-l-transparent border-r-transparent"
            :class="{ hidden: isRunning }"
          ></button>
          <input
            type="number"
            v-model.number="minutes"
            :disabled="isRunning"
            min="0"
            max="59"
            class="w-32 bg-transparent text-center text-[120px] font-bold outline-none"
            @input="minutes = minutes < 0 ? 0 : minutes > 59 ? 59 : minutes"
          />
          <button
            @click="!isRunning && (minutes > 0 ? minutes-- : (minutes = 59))"
            class="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-olive-drab"
            :class="{ hidden: isRunning }"
          ></button>
        </div>
        <div>:</div>
        <!-- Секунды -->
        <div class="flex flex-col items-center">
          <button
            @click="!isRunning && (seconds > 58 ? (seconds = 0) : seconds++)"
            class="h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-olive-drab border-l-transparent border-r-transparent"
            :class="{ hidden: isRunning }"
          ></button>
          <input
            type="number"
            v-model.number="seconds"
            :disabled="isRunning"
            min="0"
            max="59"
            class="w-32 bg-transparent text-center text-[120px] font-bold outline-none"
            @input="seconds = seconds < 0 ? 0 : seconds > 59 ? 59 : seconds"
          />
          <button
            @click="!isRunning && (seconds > 0 ? seconds-- : (seconds = 59))"
            class="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-olive-drab"
            :class="{ hidden: isRunning }"
          ></button>
        </div>
      </div>

      <!-- Кнопка запуска -->
      <div class="flex justify-center">
        <button
          class="play-btn relative h-[200px] w-[200px] rounded-full bg-olive-drab shadow-[0_0_25px_3px_rgba(86,84,73,0.8)]"
          @click="toggleTimer"
        >
          <div
            class="absolute left-0 top-0 flex h-full w-full items-center justify-center"
          >
            <!-- Символы запуска/паузы -->
            <div v-if="!isRunning">
              <div
                class="h-0 w-0 translate-x-2 border-b-[50px] border-l-[75px] border-t-[50px] border-b-transparent border-l-bone border-t-transparent"
              ></div>
            </div>
            <div v-else>
              <div class="flex gap-[20%]">
                <div class="h-[80px] w-[40px] bg-bone"></div>
                <div class="h-[80px] w-[40px] bg-bone"></div>
              </div>
            </div>
          </div>
          <div
            class="pulsate absolute inset-0 rounded-full"
            :class="{ 'animate-pulsate-1': isRunning }"
          ></div>
        </button>
      </div>

      <!-- Описание -->
      <p class="row-start-2 mb-5 lg:mb-0 text-center text-lg font-semibold text-smoky-black">
        Выбрать время медитации
      </p>
      <p class="text-center text-lg font-semibold text-smoky-black">
        Запуск таймера
      </p>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRunning: false,
      timerInterval: null,
    };
  },
  mounted() {
    this.audio = new Audio("/meditation-1.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.5;
  },
  methods: {
    startCountdown() {
      this.timerInterval = setInterval(() => {
        if (this.seconds === 0) {
          if (this.minutes === 0) {
            if (this.hours === 0) {
              clearInterval(this.timerInterval);
              this.isRunning = false;
              return;
            }
            this.hours--;
            this.minutes = 59;
          }
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      }, 1000);
    },
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.timerInterval);
        this.stopMusic();
      } else {
        this.startCountdown();
        this.playMusic();
      }
      this.isRunning = !this.isRunning;
    },
    playMusic() {
      if (this.audio) {
        this.audio.play();
      }
    },
    stopMusic() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0; // Сбрасываем на начало
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
    if (this.audio) {
      this.audio.pause();
    }
  },
};
</script>
