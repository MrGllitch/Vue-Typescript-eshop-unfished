<script lang="ts" setup>
	const actualRoute = useRoute();
	const props = defineProps<{
		path: string;
		name: string;
	}>();
</script>
<template>
	<div
		class="text-2xl font-medium transition p-2 border-b-4"
		:class="
			actualRoute.path === path
				? 'border-storefront-special'
				: 'border-transparent hover:border-storefront-gray'
		"
	>
		<NuxtLink class="block" :to="path">
			{{ name }}
		</NuxtLink>
	</div>
</template>
