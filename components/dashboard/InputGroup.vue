<script setup lang="ts">
	const props = defineProps<{
		title: string;
	}>();
</script>

<template>
	<div>
		<h3 class="mb-2 text-xl">{{ title }}</h3>
		<div class="rounded-xl border border-dashboard-special_gray p-6 shadow-lg">
			<slot></slot>
		</div>
	</div>
</template>
