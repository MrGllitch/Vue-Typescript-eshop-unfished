<script lang="ts" setup>
	const category = useRoute().params.category as string;

	const { products, error, pending } = useProducts(category);
</script>
<template>
	<NuxtLayout name="filter">
		<div v-if="pending">Loading...</div>
		<div v-if="error">Error loading products: {{ error.message }}</div>
		<div v-if="!pending && !error">
			<StorefrontProductList :products="products" />
		</div>
	</NuxtLayout>
</template>
