<script lang="ts" setup>
	const model = defineModel<string | number | number[] | null | boolean>();
	const props = defineProps<{
		type?: string;
		id?: string;
		placeholder?: string;
		label: string;
		required?: boolean;
	}>();
</script>
<template>
	<label :for="props.id" class="mb-2 block text-xs text-gray-300">
		{{ props.label }}
		<input
			:id="props.id"
			v-model="model"
			:type="props.type ?? 'text'"
			:placeholder="props.placeholder"
			:required="props.required"
			class="bg-dashboard-background_dark/25 w-full text-base mt-2 rounded-lg border border-dashboard-special_gray px-4 py-3 text-dashboard-text_light placeholder-dashboard-special_gray focus:background-dashboard-text_light"
		/>
	</label>
</template>
