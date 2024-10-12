<script lang="ts" setup>
const route = useRoute();
const { addItem } = useCart();
const content = await $fetch(`/api/product/detail?id=${route.params.id}`, {
  method: "GET",
});
</script>
<template>
  <div class="flex flex-row justify-center gap-16">
    <section class="flex flex-col w-1/2 bg-storefront-special">
      images
      <div>a</div>
    </section>
    <aside
      class="flex flex-col bg-storefront-black text-storefront-white w-1/5 px-8 py-12"
    >
      <h2 class="text-4xl font-bold mb-4">{{ content?.nameCz }}</h2>
      <div class="text-2xl font-light">
        <h3>{{ content?.countryNameCz }}</h3>
        <h3>{{ content?.localityNameCz }}</h3>
      </div>
      <hr class="my-4" />
      <dl>
        <dt class="w-1/2 float-left font-bold text-xl">Šířka</dt>
        <dd class="w-1/2 float-left text-xl font-light">
          {{ content?.width }} cm
        </dd>
        <dt class="w-1/2 float-left font-bold text-xl">Výška</dt>
        <dd class="w-1/2 float-left text-xl font-light">
          {{ content?.height }} cm
        </dd>
        <dt class="w-1/2 float-left font-bold text-xl">Hloubka</dt>
        <dd class="w-1/2 float-left text-xl font-light">
          {{ content?.depth }} cm
        </dd>
        <dt class="w-1/2 float-left font-bold text-xl">Hmotnost</dt>
        <dd class="w-1/2 float-left text-xl font-light">
          {{ content?.weight }} kg
        </dd>
      </dl>
      <hr class="my-4" />
      <h2 class="text-4xl font-bold">{{ content?.price }} Kč</h2>
      <span class="font-extralight text-storefront-gray">včetně DPH</span>
      <button
        v-on:click="addItem(+$route.params.id)"
        class="bg-storefront-white text-storefront-black py-4 my-4 w-full text-xl hover:bg-storefront-gray"
      >
        <i class="mi-shopping-cart-add" />
        Přidat do košíku
      </button>
      <StorefrontProductDetail
        header="Popis"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit accusamus iure optio quas sunt dolorum  voluptas harum, aperiam magni."
      />
    </aside>
  </div>
</template>
