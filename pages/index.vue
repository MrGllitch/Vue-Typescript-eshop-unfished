<script setup lang="ts">
	const { products, error, pending } = useProducts();
	const { addNotification } = useNotification();
	const seed = async () => {
		await useFetch("/api/seedProducts");
	};
	const notify = async () => {
		addNotification("testing");
	};
</script>

<template>
	<NuxtLayout name="filter">
		<div v-if="pending">Loading...</div>
		<StorefrontProductList :products="products"></StorefrontProductList>
	</NuxtLayout>
	<button @click="seed">Seed</button>
	<button @click="notify">notify</button>
</template>
