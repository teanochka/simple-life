<template>
  <NuxtLayout>
    <About/>
   <Calculator/>
    <Meditation/>
    <Task/>
  </NuxtLayout>
</template>
<script>
import About from "./assets/components/about.vue";
import Meditation from "./assets/components/meditation.vue";
import Task from "./assets/components/task.vue";
import Calculator from "./assets/components/calculator.vue";
export default {
  components: {
    About,
    Meditation,
    Task,
    Calculator,
  },
};
</script>
