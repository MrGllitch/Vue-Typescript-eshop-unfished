<script lang="ts" setup>
const { cartItems, removeItem, updateCart } = useCart();

onMounted(() => {
  updateCart();
});
</script>

<template>
  <div class="flex flex-row justify-center gap-16 py-16 min-h-full">
    <section class="flex flex-col w-2/3 h-full">
      <h1 class="text-4xl font-bold mb-8">Košík</h1>
      <div v-for="item in cartItems" class="flex flex-row">
        <div class="w-16 h-16">obrázek</div>
        <div class="h-full w-4/5">
          <h4 class="text-2xl font-bold">{{ item.nameCz }}</h4>
          <div class="text-lg">{{ item.descriptionCz }}</div>
        </div>

        <div class="text-2xl font-bold">{{ item.bPrice }} Kč</div>
        <button v-on:click="removeItem(item.id)">
          <i
            class="mi-delete-alt text-3xl font-extrabold text-storefront-special"
          />
        </button>
      </div>
    </section>

    <aside
      class="flex flex-col w-1/4 h-full bg-storefront-special p-8 text-2xl font-light"
    >
      <h1 class="text-4xl font-bold">Shrnutí</h1>
      <hr class="my-4" />
      <h3>Celkem bez daně:</h3>
      <h3>Dph 21%:</h3>
      <h3 class="mt-32 my-4">kód? ___________</h3>
      <hr class="my-4" />
      <h2 class="text-2xl font-bold my-4">Celkem: {todo}</h2>
      <button
        class="w-full py-4 my-4 text-storefront-white bg-storefront-black hover:bg-storefront-white hover:text-storefront-black transition"
      >
        K pokladně
      </button>
    </aside>
  </div>
</template>
