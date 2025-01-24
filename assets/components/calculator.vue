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
      <div class="mx-2 mb-4 flex gap-2 lg:mx-[20%]">
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
      <table class="mx-2 lg:mx-[20%]">
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
              <button @click="deleteItem(item._id)" class="text-red-500">
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
definePageMeta({
  auth: true,
});
export default {
  data() {
    return {
      newItem: {
        name: "",
        quantity: 1,
      },
      items: [
        { name: "Шкаф", quantity: 1, _id: "1" },
        { name: "Кресло", quantity: 2, _id: "2" },
      ],
      userId: null,
    };
  },
  async mounted() {
    const { data: session } = await $fetch("/api/auth/session", {
      headers: useRequestHeaders(["cookie"]),
    });
    this.userId = this.$auth.session.value?.id;
    console.log(this.userId, this.$auth.session.value?.email);
    const itemsPost = await $fetch("/api/items", {
      method: "POST",
      body: {
        userId: this.userId,
        category: "dishes",
      },
    });
    console.log(itemsPost);
    if (Array.isArray(itemsPost)) {
      this.items = itemsPost;
    } else {
      console.error("Неверный формат данных из API.");
    }
  },
  methods: {
    async addItem() {
      if (this.newItem.name && this.newItem.quantity > 0) {
        try {
          if (!this.userId) {
            alert("Пользователь не авторизован.");
            return;
          }
          const { message, item } = await $fetch("/api/addItem", {
            method: "POST",
            body: {
              userId: this.userId,
              item: this.newItem,
              category: "dishes",
            },
          });

          console.log(message);
          if (item) {
            this.items.push(item);
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
    async deleteItem(itemId) {
      try {
        if (!this.userId) {
          alert("Пользователь не авторизован.");
          return;
        }
        const { message } = await $fetch("/api/deleteItem", {
          method: "DELETE",
          body: {
            userId: this.userId,
            itemId: itemId,
            category: "dishes",
          },
        });

        console.log(message);
        this.items = this.items.filter((item) => item._id !== itemId);
      } catch (error) {
        console.error("Ошибка при удалении предмета:", error);
        alert("Произошла ошибка при удалении предмета.");
      }
    },
  },
};
</script>
