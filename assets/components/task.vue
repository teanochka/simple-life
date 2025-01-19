<template>
  <section id="task" class="relative">
    <div class="flex items-center">
      <div class="h-[1px] w-full bg-olive-drab"></div>
      <h2
        class="my-8 w-full text-center text-3xl font-bold uppercase text-olive-drab"
      >
        сделайте один шаг вперед
      </h2>
      <div class="h-[1px] w-full bg-olive-drab"></div>
    </div>

    <div class="relative flex justify-center">
      <img
        src="/svg/tree.svg"
        loading="lazy"
        alt="click here"
        class="cursor-pointer"
        @click="toggleTip"
      />

      <div
        v-if="showTip"
        class="animate-fadeIn absolute top-[30%] h-max w-[300px] border border-olive-drab bg-bone p-4 text-center text-lg font-medium text-olive-drab text-smoky-black shadow-lg"
      >
        {{ tipOfTheDay }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showTip: false,
      tips: [
        "Не бойтесь ошибаться — ошибки ведут к росту.",
        "Каждый день учитесь чему-то новому.",
        "Природа — лучший источник вдохновения.",
        "Сделайте паузу и глубоко вдохните.",
        "Оглянитесь вокруг — мир полон возможностей.",
      ],
    };
  },
  computed: {
    tipOfTheDay() {
      return this.tips[Math.floor(Math.random() * this.tips.length)];
    },
  },
  methods: {
    toggleTip() {
      this.showTip = !this.showTip;

      if (this.showTip) {
        setTimeout(() => {
          this.showTip = false;
        }, 5000);
      }
    },
  },
};
</script>
