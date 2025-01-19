<template>
  <section id="calculator" class="py-8">
    <div class="flex items-center">
      <div class="h-[1px] w-full bg-olive-drab"></div>
      <h2
        class="my-8 w-full text-center text-3xl font-bold uppercase text-olive-drab"
      >
        оцените количество вещей в доме
      </h2>
      <div class="h-[1px] w-full bg-olive-drab"></div>
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="w-full text-center text-2xl text-olive-drab">мебель</h3>

      <!-- Форма для добавления новой строки -->
      <div class="mx-[20%] mb-4 flex gap-2">
        <input
          v-model="newItem.name"
          type="text"
          placeholder="Название"
          class="flex-grow border p-2"
        />
        <input
          v-model="newItem.quantity"
          type="number"
          placeholder="Количество"
          class="flex-grow border p-2"
        />
        <button @click="addItem" class="w-1/4 bg-olive-drab p-2 text-bone">
          Добавить
        </button>
      </div>

      <!-- Таблица -->
      <table class="mx-[20%]">
        <thead>
          <tr class="bg-olive-drab text-left text-bone">
            <th class="p-3">Название</th>
            <th class="p-3">Количество</th>
            <th class="p-3">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item._id"
            class="border-b-[1px] border-olive-drab even:bg-olive-drab/[0.2]"
          >
            <td class="p-3">
              <input
                v-model="item.name"
                type="text"
                class="border-none bg-transparent outline-none"
              />
            </td>
            <td class="p-3">
              <input
                v-model="item.quantity"
                type="number"
                class="border-none bg-transparent outline-none"
              />
            </td>
            <td class="p-3">
              <button
                @click="deleteItem(item._id, 'dishes')"
                class="text-red-500"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
        name: "",
        quantity: 1,
      },
      items: [
        { _id: "1", name: "Шкаф", quantity: 1 },
        { _id: "2", name: "Кресло", quantity: 2 },
      ],
    };
  },
  methods: {
    // Добавить новый предмет в таблицу
    async addItem() {
      if (this.newItem.name && this.newItem.quantity > 0) {
        const { data } = await useFetch(
          "/api/user/12345/addItem?category=dishes",
          {
            method: "POST",
            body: this.newItem,
          },
        );
        this.items.push({ ...this.newItem });
        this.newItem.name = "";
        this.newItem.quantity = 1;
      } else {
        alert("Заполните все поля корректно!");
      }
    },
    // Удалить элемент из таблицы
    async deleteItem(itemId, category) {
      const { data } = await useFetch(
        `/api/user/12345/deleteItem?itemId=${itemId}&category=${category}`,
        {
          method: "DELETE",
        },
      );
      // Удалить элемент из локальной таблицы
      this.items = this.items.filter((item) => item._id !== itemId);
    },
  },
};
</script>
