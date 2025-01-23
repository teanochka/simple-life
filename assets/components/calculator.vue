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
                @click="deleteItem(item._id)"
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
        try {
          // Отправляем новый предмет на сервер
          const { data } = await useFetch("/api/user/12345/addItem", {
            method: "POST",
            body: this.newItem,
          });

          // Если сервер вернул данные, добавляем их в локальный массив
          if (data && data.item) {
            this.items.push(data.item); // Добавляем предмет с ответом сервера
            this.newItem.name = "";
            this.newItem.quantity = 1;
          } else {
            alert("Ошибка при добавлении предмета.");
          }
        } catch (error) {
          console.error("Ошибка при добавлении предмета:", error);
          alert("Произошла ошибка при добавлении предмета.");
        }
      } else {
        alert("Заполните все поля корректно!");
      }
    },
    // Удалить элемент из таблицы
    async deleteItem(itemId) {
      try {
        // Отправляем запрос на удаление предмета с сервера
        const { data } = await useFetch(`/api/user/12345/deleteItem?itemId=${itemId}`, {
          method: "DELETE",
        });

        // Если предмет успешно удалён, удаляем его из локального массива
        if (data && data.message === "Item deleted successfully") {
          this.items = this.items.filter((item) => item._id !== itemId);
        } else {
          alert("Ошибка при удалении предмета.");
        }
      } catch (error) {
        console.error("Ошибка при удалении предмета:", error);
        alert("Произошла ошибка при удалении предмета.");
      }
    },
  },
};
</script>
