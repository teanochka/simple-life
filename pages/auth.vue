<template>
  <div class="page-background">
    <div class="register-form">
      <h1>Регистрация</h1>
      <form @submit.prevent="handleRegister">
        <label for="username">Имя пользователя</label>
        <input id="username" v-model="form.username" type="text" required />

        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />

        <label for="password">Пароль</label>
        <input id="password" v-model="form.password" type="password" required />

        <button type="submit">Зарегистрироваться</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Для использования роутинга

// Формы регистрации
const form = ref({
  username: "",
  email: "",
  password: "",
});

// Сообщение для вывода ошибок или успеха
const message = ref("");
const router = useRouter(); // Используем роутер для перенаправления

// Метод для регистрации
const handleRegister = async () => {
  try {
    console.log("Form data being sent:", form.value);

    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: form.value,
      credentials: "include",
    });

    if (response && response.message === "Registration successful!") {
      message.value = "Registration successful!";
      form.value = { username: "", email: "", password: "" };

      router.push("/dashboard");
    } else {
      message.value = "Registration failed. Please try again.";
    }
  } catch (error) {
    console.error("Registration error:", error);
    message.value = error.data?.message || "Registration failed.";
  }
};

</script>

<style>
.page-background {
  background-color: #d8cfbc;
  min-height: 78vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  color: #565449;
  font-size: 24px;
  background-color: #fffbf4;
  text-align: center;
}
.register-form label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.register-form input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  background-color: #ffffff;
  margin-bottom: 16px;
  border: 1px solid #ccc;
}
.register-form button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #565449;
  color: #fff;
  border: none;
  cursor: pointer;
}
.register-form button:hover {
  background-color: #413f37;
}
</style>
