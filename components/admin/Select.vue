<script lang="ts" setup>
	const model = defineModel<number[] | number | null>(); // Either an array of numbers, a single number, or null
	const props = defineProps<{
		id?: string;
		placeholder?: string;
		label: string;
		options: { value: number; label: string }[];
		multiple: boolean;
	}>();
	let search = ref<string | null>(null);
	let filteredOptions = computed(() => {
		if (!search.value) return props.options;
		return props.options.filter((option) =>
			option.label.toLowerCase().includes(search.value!.toLowerCase())
		);
	});

	// Handle selection of an option
	function selectOption(optionValue: number) {
		if (props.multiple) {
			// Multiple selection mode
			if (!Array.isArray(model.value)) {
				model.value = [];
			}
			if (model.value.includes(optionValue)) {
				// Remove if it's already selected
				model.value = model.value.filter((val) => val !== optionValue);
			} else {
				// Add the selected option to the model
				model.value.push(optionValue);
			}
		} else {
			// Single selection mode
			model.value = optionValue;
		}
	}

	// Check if an option is selected
	function isSelected(optionValue: number): boolean {
		if (props.multiple) {
			return Array.isArray(model.value) && model.value.includes(optionValue);
		}
		return model.value === optionValue;
	}
</script>

<template>
	<label :for="props.id" class="mb-2 block text-xs relative text-gray-300">
		{{ props.label }}
		<input
			:id="props.id"
			v-model="search"
			type="text"
			:placeholder="props.placeholder"
			class="bg-dashboard-background_dark/25 w-full text-base mt-2 rounded-lg border border-dashboard-special_gray px-4 py-3 text-dashboard-text_light placeholder-dashboard-special_gray focus:background-dashboard-text_light"
		/>
	</label>

	<!-- Filtered options will be displayed here -->
	<ul
		class="bg-dashboard-background_dark w-full mt-2 rounded-lg border border-dashboard-special_gray max-h-48 overflow-y-auto"
	>
		<li
			v-for="option in filteredOptions"
			:key="option.value"
			@click="selectOption(option.value)"
			:class="{
				'bg-blue-500 text-white': isSelected(option.value),
				'text-dashboard-text_light': !isSelected(option.value),
			}"
			class="cursor-pointer p-2 hover:bg-blue-400 hover:text-white transition-colors"
		>
			{{ option.label }}
		</li>
	</ul>
</template>
