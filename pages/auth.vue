<template>
  <div>
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <label>
        Username:
        <input type="text" v-model="username" placeholder="Имя пользователя" />
      </label>
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Пароль:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>


<script setup>
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');

const register = async () => {
  const { data, error } = await useFetch('/api/auth/register', {
    method: 'POST',
    body: { username: username.value, email: email.value, password: password.value },
  });

  if (data.value.success) {
    console.log('Регистрация успешна');
  } else {
    console.log('jiibibibi');
  }
};
</script>
