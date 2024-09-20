<script lang="ts" setup>
	const route = useRoute();
	const props = defineProps<{
		name: string;
		path: string;
		icon: string;
	}>();
</script>
<template>
	<div
		class="w-full text-center text-2xl font-bold hover:bg-storefront-gray transition flex flex-column"
		:class="{
			'bg-storefront-black text-storefront-white hover:bg-storefront-black hover:text-storefront-gray':
				`/account/${props.path}` === route.path,
			'bg-storefront-white text-storefront-black':
				`/account/${props.path}` !== route.path,
		}"
	>
		<i class="pr-2" :class="props.icon" />
		<NuxtLink class="block" :to="`/account/${path}`">
			{{ name }}
		</NuxtLink>
	</div>
</template>
