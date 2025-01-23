<template>
    <section>
      <h1>Ваши предметы:</h1>
      <div v-if="items.length">
        <ul>
          <li v-for="item in items" :key="item._id">
            {{ item.name }} - {{ item.quantity }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>У вас пока нет предметов.</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [], // Здесь будем хранить данные пользователя
      };
    },
    async mounted() {
      try {
        const data = await $fetch("/api/user/items"); // API для загрузки предметов
        this.items = data.items;
      } catch (error) {
        console.error("Ошибка загрузки предметов:", error);
        alert("Не удалось загрузить данные.");
      }
    },
  };
  </script>
  