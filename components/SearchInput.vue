<script setup lang="ts">
interface SearchSuggestion {
	id: string;
	name: string;
	category?: string;
}

interface Props {
	placeholder?: string;
	suggestions?: SearchSuggestion[];
	loading?: boolean;
	modelValue?: string;
}

interface Emits {
	(e: 'update:modelValue', value: string): void;
	(e: 'search', value: string): void;
	(e: 'select', suggestion: SearchSuggestion): void;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Search...',
	suggestions: () => [],
	loading: false,
	modelValue: ''
});

const emit = defineEmits<Emits>();

const searchInput = ref<HTMLInputElement>();
const showSuggestions = ref(false);
const searchValue = ref(props.modelValue);

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
	searchValue.value = newValue;
});

// Handle input changes
const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	searchValue.value = target.value;
	emit('update:modelValue', target.value);
	showSuggestions.value = target.value.length > 0 && props.suggestions.length > 0;
};

// Handle search action
const handleSearch = () => {
	emit('search', searchValue.value);
	showSuggestions.value = false;
};

// Handle suggestion selection
const selectSuggestion = (suggestion: SearchSuggestion) => {
	searchValue.value = suggestion.name;
	emit('update:modelValue', suggestion.name);
	emit('select', suggestion);
	showSuggestions.value = false;
	searchInput.value?.focus();
};

// Handle key events
const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === 'Enter') {
		handleSearch();
	} else if (event.key === 'Escape') {
		showSuggestions.value = false;
	}
};

// Close suggestions when clicking outside
const handleClickOutside = () => {
	showSuggestions.value = false;
};

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
	<div class="relative w-full">
		<!-- Search Input Container -->
		<div class="relative">
			<input
				ref="searchInput"
				v-model="searchValue"
				type="text"
				:placeholder="placeholder"
				class="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
				@input="handleInput"
				@keydown="handleKeydown"
				@click.stop="showSuggestions = searchValue.length > 0 && suggestions.length > 0"
			/>
			
			<!-- Search Button -->
			<button
				@click="handleSearch"
				class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
				:disabled="loading"
				aria-label="Search"
			>
				<!-- Loading Spinner -->
				<div
					v-if="loading"
					class="animate-spin w-5 h-5"
				>
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v1m6 6h1m-6 6v1m-6-6H4m5.636-5.636l-.707.707M16.95 16.95l-.707-.707M16.95 7.05l-.707.707M7.05 16.95l-.707-.707"
						/>
					</svg>
				</div>
				
				<!-- Search Icon -->
				<svg
					v-else
					class="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</div>

		<!-- Suggestions Dropdown -->
		<Transition
			enter-active-class="transition ease-out duration-200"
			enter-from-class="opacity-0 translate-y-1"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition ease-in duration-150"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 translate-y-1"
		>
			<div
				v-if="showSuggestions && suggestions.length > 0"
				class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
				@click.stop
			>
				<ul class="py-1">
					<li
						v-for="suggestion in suggestions"
						:key="suggestion.id"
						@click="selectSuggestion(suggestion)"
						class="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
					>
						<div class="flex flex-col">
							<span class="font-medium text-gray-900">{{ suggestion.name }}</span>
							<span
								v-if="suggestion.category"
								class="text-sm text-gray-500"
							>
								{{ suggestion.category }}
							</span>
						</div>
					</li>
				</ul>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
/* Animation for loading spinner */
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.animate-spin {
	animation: spin 1s linear infinite;
}
</style>