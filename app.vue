<template>
  <header class="m-4 flex justify-between">
    <div>
      <img src="/svg/menu.svg" class="h-[40px]" alt="меню" />
    </div>
    <div class="justify-self-center">
      <h1 class="text-olive-drab mb-1 text-center text-4xl font-bold">
        Simple life
      </h1>
      <h2 class="text-smoky-black text-center text-lg font-semibold">
        Спокойствие. Простота. Осознанность.
      </h2>
    </div>
    <div>
      <img src="/svg/github.svg" class="h-[40px]" alt="github" />
    </div>
  </header>
  <nav
    class="bg-olive-drab text-bone mt-2 flex hidden w-fit flex-col gap-3 p-4 text-lg font-semibold"
  >
    <div class="border-bone hover:bg-bone/[0.1] border-b-[1px] pr-10">
      главная
    </div>
    <div class="border-bone hover:bg-bone/[0.1] border-b-[1px] pr-10">
      калькулятор
    </div>
    <div class="border-bone hover:bg-bone/[0.1] border-b-[1px] pr-10">
      медитация
    </div>
    <div class="hover:bg-bone/[0.1] pr-10">задание</div>
  </nav>
  <section id="about" class="p-4">
    <div class="grid grid-cols-2 gap-8">
      <img loading="lazy" src="/img/about.jpg" alt="" />
      <div>
        <h2 class="text-3xl font-semibold">Что это такое?</h2>
        <p>объяснение, что это такое</p>
        <h2 class="text-3xl font-semibold">Что это вам дает?</h2>
        <ul class="grid list-disc grid-cols-3">
          <li>это</li>
          <li>это</li>
          <li>это</li>
          <li>это</li>
          <li>это</li>
        </ul>
      </div>
    </div>
  </section>
  <section>
    <div class="flex items-center">
      <div class="bg-olive-drab h-[1px] w-[30%]"></div>
      <h2
        class="text-olive-drab w-full text-center text-3xl font-bold uppercase"
      >
        оценка количества вещей в доме
      </h2>
      <div class="bg-olive-drab h-[1px] w-[30%]"></div>
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
          <tr class="border-olive-drab even:bg-olive-drab/[0.2] border-b-[1px]">
            <td class="p-3">Шкаф</td>
            <td class="p-3">1</td>
          </tr>
          <tr class="border-olive-drab even:bg-olive-drab/[0.2] border-b-[1px]">
            <td class="p-3">Кресло</td>
            <td class="p-3">2</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section>
    <div class="flex items-center">
      <div class="bg-olive-drab h-[1px] w-[30%]"></div>
      <h2
        class="text-olive-drab w-full text-center text-3xl font-bold uppercase"
      >
        успокойте свой ум
      </h2>
      <div class="bg-olive-drab h-[1px] w-[30%]"></div>
    </div>
  </section>
</template>
