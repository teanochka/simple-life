<template>
  <NuxtLayout>
    <About/>
    <section id="calculator">
      <div class="flex items-center">
        <div class="bg-olive-drab h-[1px] w-full"></div>
        <h2
          class="text-olive-drab my-8 w-full text-center text-3xl font-bold uppercase"
        >
          оценка количества вещей в доме
        </h2>
        <div class="bg-olive-drab h-[1px] w-full"></div>
      </div>
      <div class="flex flex-col justify-center">
        <h3 class="text-olive-drab w-full text-center text-2xl">мебель</h3>
        <table class="mx-[20%]">
          <thead>
            <tr class="bg-olive-drab text-bone text-left">
              <th class="p-3">Название</th>
              <th class="p-3">Количество</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-olive-drab even:bg-olive-drab/[0.2] border-b-[1px]"
            >
              <td class="p-3">Шкаф</td>
              <td class="p-3">1</td>
            </tr>
            <tr
              class="border-olive-drab even:bg-olive-drab/[0.2] border-b-[1px]"
            >
              <td class="p-3">Кресло</td>
              <td class="p-3">2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section id="task">
      <div class="flex items-center">
        <div class="bg-olive-drab h-[1px] w-full"></div>
        <h2
          class="text-olive-drab my-8 w-full text-center text-3xl font-bold uppercase"
        >
          успокойте свой ум
        </h2>
        <div class="bg-olive-drab h-[1px] w-full"></div>
      </div>
      <div class="flex justify-center">
        <img src="/svg/tree.svg" loading="lazy" alt="click here" />
        <div class="hidden">совет дня:</div>
      </div>
    </section>
    <Meditation/>
  </NuxtLayout>
</template>
<script>
import About from "./assets/components/about.vue";
import Meditation from "./assets/components/meditation.vue";
export default {
  components: {
    About,
    Meditation,
  },
};
</script>
