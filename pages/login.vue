<template>
    <div>
      <h1>Вход</h1>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Пароль" />
        <button @click="login">Войти</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const login = async () => {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });
  
    if (data.value.success) {
      localStorage.setItem('token', data.value.token);
      alert('Вход успешен');
    } else {
      alert(data.value.message || error.value.message);
    }
  };
  </script>
  