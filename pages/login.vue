<template>
  <div class="m-0 flex h-screen w-full justify-center bg-bone">
    <div
      class="relative top-[15%] flex h-fit w-fit flex-col items-center border border-olive-drab bg-white p-10"
    >
      <h2 class="text-4xl font-bold text-olive-drab">Вход</h2>
      <form @submit.prevent="login" class="flex flex-col">
        <div class="grid grid-cols-[1fr_2fr] gap-3 py-8 text-olive-drab">
          <label> Email: </label>
          <input
            type="email"
            v-model="email"
            required
            class="border border-olive-drab bg-white p-2"
          />
          <label> Пароль: </label>
          <input
            type="password"
            v-model="password"
            required
            class="border border-olive-drab bg-white p-2"
          />
        </div>
        <button type="submit" class="rounded-sm bg-olive-drab p-2 text-bone">
          Войти
        </button>
      </form>
      <p class="mt-3 text-olive-drab">
        Впервые здесь?
        <NuxtLink  to="/register" class="cursor-pointer text-blue-600 hover:underline"
          >Создать учетную запись</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const login = async () => {
  console.log(email.value, password.value);
  const { data, error } = await $fetch("/api/auth/login", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });

  if (data) {
    console.log("Вход успешен");
  } else {
    console.log(error);
  }
};
</script>
