<script lang="ts" setup>
	const model = defineModel<string>();
	const props = defineProps<{
		type?: string;
		id?: string;
		placeholder?: string;
		label: string;
		required?: boolean;
	}>();
</script>
<template>
	<label
		:for="props.id"
		class="mb-6 block text-s text-storefront-black font-medium"
	>
		{{ props.label }}
		<input
			:id="props.id"
			v-model="model"
			:type="props.type ?? 'text'"
			:placeholder="props.placeholder"
			:required="props.required"
			class="w-full bg-storefront-white border-b-2 mt-2 border-storefront-black text-xl focus:outline-none"
		/>
	</label>
</template>
