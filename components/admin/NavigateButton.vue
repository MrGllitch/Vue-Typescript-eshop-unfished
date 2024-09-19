<script lang="ts" setup>
	const props = defineProps<{
		to: string;
		label: string;
		icon?: string;
	}>();
</script>
<template>
	<NuxtLink
		class="border p-2 border-dashboard-special_gray rounded-md hover:border-dashboard-text_light transition"
		:to="to"
	>
		<i v-if="props.icon != null" class="pr-2" :class="props.icon" />
		{{ props.label }}
	</NuxtLink>
</template>
