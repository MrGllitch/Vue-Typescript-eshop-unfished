<script lang="ts" setup>
	import type { AsyncDataRequestStatus } from "#app";

	const props = defineProps<{
		products: listProduct[];
		status?: Ref<AsyncDataRequestStatus>;
	}>();
</script>

<template>
	<section
		class="grow grid gap-2 md:gap-2 lg:gap-4 xl:gap-6 md:grid-cols-3 lg:grid-cols-4 basis-4/5"
	>
		<div v-if="products.length == 0">No products found</div>
		<StorefrontListItem
			v-for="product in products"
			:product="product"
		></StorefrontListItem>
		<StorefrontListItem
			v-for="product in products"
			:product="product"
		></StorefrontListItem>
		<StorefrontListItem
			v-for="product in products"
			:product="product"
		></StorefrontListItem>
	</section>
</template>
