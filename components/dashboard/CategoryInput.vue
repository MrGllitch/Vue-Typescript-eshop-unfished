<script lang="ts" setup>
	const model = defineModel<number[]>();
	const props = defineProps<{
		id?: string;
		label: string;
		required?: boolean;
		value?: string | number;
	}>();
</script>

<template>
	<label
		:for="props.id + 'category'"
		class="text-base text-dashboard-text_light mb-2 block"
	>
		{{ props.label }}
		<input
			:id="props.id + 'category'"
			v-model="model"
			type="checkbox"
			:required="props.required"
			:value="value"
		/>
	</label>
</template>
