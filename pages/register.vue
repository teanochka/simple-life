<template>
  <div class="m-0 flex h-screen w-full justify-center bg-bone">
    <div
      class="relative top-[15%] flex h-fit w-fit flex-col items-center border border-olive-drab bg-white p-10"
    >
      <h2 class="text-4xl font-bold text-olive-drab">Регистрация</h2>
      <form @submit.prevent="register" class="flex flex-col">
        <div class="grid grid-cols-[1fr_2fr] gap-3 py-8 text-olive-drab">
          <label> Имя пользователя: </label>
          <input
            type="text"
            v-model="username"
            required
            class="border border-olive-drab bg-white p-2"
          />
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
          Зарегистрироваться
        </button>
      </form>
      <p class="mt-3 text-olive-drab">
        Уже есть учетная запись?
        <NuxtLink to="/login" class="cursor-pointer text-blue-600 hover:underline"
          >Войти</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  console.log(username.value, email.value, password.value);
  const { data, error } = await $fetch("/api/auth/register", {
    method: "POST",
    body: {
      username: username.value,
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
