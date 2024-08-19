<script lang="ts" setup>
	const model = defineModel<number[]>();
	const props = defineProps<{
		id?: string;
		label: string;
		required?: boolean;
		value?: string | number;
		color: string;
	}>();
</script>

<template>
	<input
		:id="props.id + 'color'"
		v-model="model"
		type="checkbox"
		:required="props.required"
		:value="value"
		:style="{
			backgroundColor: props.color,
			borderWidth: model?.includes(Number(props.value)) ? '4px' : '0',
		}"
		class="appearance-none h-8 w-8 rounded border-4 transition border-red-700"
	/>
</template>
