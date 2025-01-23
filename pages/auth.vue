<template>
  <div class="register-form">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <label for="username">Username</label>
      <input id="username" v-model="form.username" type="text" required />

      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" required />

      <label for="password">Password</label>
      <input id="password" v-model="form.password" type="password" required />

      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
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
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.register-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
.register-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.register-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.register-form button:hover {
  background-color: #0056b3;
}
</style>
