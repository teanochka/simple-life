<template>
  <nav
    class="absolute flex w-fit flex-col gap-3 overflow-hidden bg-olive-drab px-4 text-lg font-semibold text-bone transition-all duration-200"
    :class="isNavVisible ? 'h-auto p-4' : 'h-0'"
  >
    <NuxtLink
      :to="'#about'"
      @click="$emit('close')"
      class="border-b-[1px] border-bone pr-10 hover:bg-bone/[0.1]"
    >
      главная
    </NuxtLink>
    <NuxtLink
      :to="'#calculator'"
      @click="$emit('close')"
      class="border-b-[1px] border-bone pr-10 hover:bg-bone/[0.1]"
    >
      калькулятор
    </NuxtLink>
    <NuxtLink
      :to="'#meditation'"
      @click="$emit('close')"
      class="border-b-[1px] border-bone pr-10 hover:bg-bone/[0.1]"
    >
      медитация
    </NuxtLink>
    <NuxtLink
      :to="'#task'"
      @click="$emit('close')"
      class="border-b-[1px] border-bone pr-10 hover:bg-bone/[0.1]"
    >
      задание
    </NuxtLink>
  </nav>
</template>
<script>
export default {
  props: {
    isNavVisible: Boolean,
  },
};
</script>
