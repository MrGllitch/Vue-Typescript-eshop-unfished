<script lang="ts" setup>
	const model = defineModel<string | number | number[] | null | boolean>();
	const props = defineProps<{
		type?: string;
		id?: string;
		placeholder?: string;
		label: string;
		required?: boolean;
		options?: string[];
	}>();

	const value: Ref<string | null> = ref(null);

	watch(model, (newVal) => {
		value.value = newVal?.toString() || null;
	});

	const onInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		model.value = target.value;
	};
</script>

<template>
	<label :for="props.id" class="mb-2 block text-xs text-gray-300">
		{{ props.label }}

		<input
			:id="props.id"
			v-model="value"
			:type="props.type ?? 'text'"
			:placeholder="props.placeholder"
			:required="props.required"
			:list="'datalist-options' + props.label"
			@input="onInputChange"
			class="bg-dashboard-background_dark/25 w-full text-base mt-2 rounded-lg border border-dashboard-special_gray px-4 py-3 text-dashboard-text_light placeholder-dashboard-special_gray focus:background-dashboard-text_light"
		/>

		<datalist v-if="props.options" :id="'datalist-options' + props.label">
			<option v-for="option in props.options" :key="option" :value="option" />
		</datalist>
	</label>
</template>
