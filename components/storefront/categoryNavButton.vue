<script lang="ts" setup>
	import type { Category } from "@prisma/client";
	const selectedCategory = useRoute().params.category;
	const props = defineProps<{
		category: Category;
	}>();
</script>
<template>
	<div
		class="w-full text-center text-2xl font-bold hover:bg-storefront-gray transition"
		:class="
			selectedCategory === category.slug
				? 'bg-storefront-black text-storefront-white hover:bg-storefront-black hover:text-storefront-gray'
				: 'bg-storefront-white text-storefront-black'
		"
	>
		<NuxtLink
			class="block"
			:to="{ name: 'category', params: { category: category.slug } }"
		>
			{{ category.nameCz }}
		</NuxtLink>
	</div>
</template>
