<template>
  <header>
    <div class="m-4 flex justify-between">
      <button @click="toggleMenu">
        <img loading="lazy" src="/svg/menu.svg" class="h-[40px]" alt="меню" />
      </button>
      <div class="justify-self-center">
        <h1 class="mb-1 text-center text-4xl font-bold text-olive-drab">
          Simple life
        </h1>
        <h2 class="text-center text-lg font-semibold text-smoky-black">
          Спокойствие. Простота. Осознанность.
        </h2>
      </div>
      <a
        href="https://github.com/teanochka/simple-life"
        class="flex items-center"
      >
        <img src="/svg/github.svg" class="h-[40px]" alt="github" />
      </a>
    </div>
    <div class="h-[1px] w-full bg-olive-drab"></div>
    <Nav :isNavVisible="isNavVisible" @close="isNavVisible = false" />
  </header>
</template>
<script>
import Nav from "./assets/components/nav.vue";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      isNavVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isNavVisible = !this.isNavVisible;
    },
  },
};
</script>
