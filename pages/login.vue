<template>
  <div class="page-background">
    <section class="login-container">
      <h1 class="text-center text-3xl font-bold mb-6">Login</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 max-w-md mx-auto">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="p-3 border border-gray-300 rounded"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="p-3 border border-gray-300 rounded"
          required
        />
        <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Отправляем запрос на сервер для авторизации
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            email: this.email,
            password: this.password,
          },
          // Включаем возможность отправки и получения кук
          credentials: 'include',
        });

        // Если ответ успешный, перенаправляем на /dashboard
        if (response) {
          this.$router.push('/dashboard');
        } else {
          throw new Error('Invalid server response');
        }
      } catch (err) {
        console.error('Login failed:', err);
        // Устанавливаем сообщение об ошибке для пользователя
        this.error = 'Invalid email or password. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.page-background {
  background-color: #d8cfbc;
  min-height: 78vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.login-container {
  padding: 2rem;
  color: #fff;
}
button:hover {
  transition: background-color 0.3s ease;
}
</style>
