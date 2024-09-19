<script setup lang="ts">
	const { products, error, pending } = useProducts();
	const seed = async () => {
		await useFetch("/api/seedProducts");
	};
</script>

<template>
	<NuxtLayout name="filter">
		<div v-if="pending">Loading...</div>
		<StorefrontProductList :products="products"></StorefrontProductList>
	</NuxtLayout>
	<button @click="seed">Seed</button>
</template>
