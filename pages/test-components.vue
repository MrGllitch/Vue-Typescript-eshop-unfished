<script setup>
// Test page for our new components
const searchValue = ref('');
const searchSuggestions = ref([
	{ id: '1', name: 'Quartz Crystal', category: 'Minerals' },
	{ id: '2', name: 'Amethyst', category: 'Gemstones' },
	{ id: '3', name: 'Fossil Collection', category: 'Fossils' }
]);
const isLoading = ref(false);
const selectedRegion = ref('');
const selectedCategory = ref('');

// Handle search
const handleSearch = (value) => {
	console.log('Searching for:', value);
	isLoading.value = true;
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
};

// Handle suggestion selection
const handleSuggestionSelect = (suggestion) => {
	console.log('Selected suggestion:', suggestion);
};

// Handle region selection
const handleRegionSelect = (region) => {
	console.log('Selected region:', region);
	selectedRegion.value = region.id;
};

// Handle category selection
const handleCategorySelect = (category) => {
	console.log('Selected category:', category);
	selectedCategory.value = category.id;
};

// Handle back actions
const handleBack = () => {
	console.log('Back button clicked');
};
</script>

<template>
	<div class="min-h-screen bg-gray-50 py-8">
		<div class="max-w-4xl mx-auto px-4 space-y-12">
			<h1 class="text-3xl font-bold text-center text-gray-900 mb-8">
				Component Testing Page
			</h1>

			<!-- SearchInput Component Test -->
			<section class="bg-white rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold mb-4">SearchInput Component</h2>
				<SearchInput
					v-model="searchValue"
					placeholder="Search for minerals..."
					:suggestions="searchSuggestions"
					:loading="isLoading"
					@search="handleSearch"
					@select="handleSuggestionSelect"
				/>
				<p class="mt-2 text-sm text-gray-600">
					Current value: {{ searchValue }}
				</p>
			</section>

			<!-- CzechMap Component Test -->
			<section class="bg-white rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold mb-4">CzechMap Component</h2>
				<CzechMap
					:selected-region="selectedRegion"
					@select-region="handleRegionSelect"
					@back="handleBack"
				/>
				<p class="mt-2 text-sm text-gray-600">
					Selected region: {{ selectedRegion || 'None' }}
				</p>
			</section>

			<!-- ServiceCategories Component Test -->
			<section class="bg-white rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold mb-4">ServiceCategories Component</h2>
				<ServiceCategories
					:selected-category="selectedCategory"
					:columns="3"
					@select-category="handleCategorySelect"
					@back="handleBack"
				/>
				<p class="mt-2 text-sm text-gray-600">
					Selected category: {{ selectedCategory || 'None' }}
				</p>
			</section>

			<!-- LoadingSpinner Component Test -->
			<section class="bg-white rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold mb-4">LoadingSpinner Component</h2>
				<div class="flex space-x-4 items-center">
					<div class="text-center">
						<LoadingSpinner size="sm" />
						<p class="text-xs mt-1">Small</p>
					</div>
					<div class="text-center">
						<LoadingSpinner size="md" />
						<p class="text-xs mt-1">Medium</p>
					</div>
					<div class="text-center">
						<LoadingSpinner size="lg" />
						<p class="text-xs mt-1">Large</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>