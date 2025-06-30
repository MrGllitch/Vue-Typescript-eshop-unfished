<script setup lang="ts">
interface ServiceCategory {
	id: string;
	name: string;
	description?: string;
	icon?: string;
	color?: string;
}

interface Props {
	categories?: ServiceCategory[];
	selectedCategory?: string;
	showBackButton?: boolean;
	columns?: number;
}

interface Emits {
	(e: 'select-category', category: ServiceCategory): void;
	(e: 'back'): void;
}

const props = withDefaults(defineProps<Props>(), {
	categories: () => [],
	selectedCategory: '',
	showBackButton: true,
	columns: 3
});

const emit = defineEmits<Emits>();

// Default service categories
const defaultCategories: ServiceCategory[] = [
	{
		id: 'minerals',
		name: 'Minerals',
		description: 'Natural mineral specimens',
		color: 'bg-emerald-500'
	},
	{
		id: 'fossils',
		name: 'Fossils',
		description: 'Prehistoric fossil specimens',
		color: 'bg-orange-500'
	},
	{
		id: 'gems',
		name: 'Gemstones',
		description: 'Precious and semi-precious stones',
		color: 'bg-purple-500'
	},
	{
		id: 'crystals',
		name: 'Crystals',
		description: 'Natural crystal formations',
		color: 'bg-blue-500'
	},
	{
		id: 'jewelry',
		name: 'Jewelry',
		description: 'Handcrafted mineral jewelry',
		color: 'bg-pink-500'
	},
	{
		id: 'tools',
		name: 'Tools',
		description: 'Mining and collecting tools',
		color: 'bg-gray-500'
	},
	{
		id: 'books',
		name: 'Books',
		description: 'Educational materials',
		color: 'bg-indigo-500'
	},
	{
		id: 'equipment',
		name: 'Equipment',
		description: 'Specialized equipment',
		color: 'bg-teal-500'
	},
	{
		id: 'rare',
		name: 'Rare Specimens',
		description: 'Unique and rare finds',
		color: 'bg-red-500'
	}
];

const categoriesToDisplay = computed(() => props.categories.length > 0 ? props.categories : defaultCategories);

// Handle category selection
const selectCategory = (category: ServiceCategory) => {
	emit('select-category', category);
};

// Handle back button
const handleBack = () => {
	emit('back');
};

// Get grid classes based on columns
const gridClasses = computed(() => {
	const colMap = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
		5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
		6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
	};
	return colMap[props.columns as keyof typeof colMap] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
});

// Get category card classes
const getCategoryCardClasses = (category: ServiceCategory) => {
	const baseClasses = 'group relative overflow-hidden rounded-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg';
	const isSelected = props.selectedCategory === category.id;
	
	if (isSelected) {
		return `${baseClasses} border-blue-500 shadow-lg scale-105`;
	} else {
		return `${baseClasses} border-gray-200 hover:border-gray-300`;
	}
};

// Get category background classes
const getCategoryBgClasses = (category: ServiceCategory) => {
	return category.color || 'bg-gray-500';
};
</script>

<template>
	<div class="w-full max-w-6xl mx-auto">
		<!-- Back Button -->
		<div v-if="showBackButton" class="mb-6">
			<button
				@click="handleBack"
				class="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg hover:bg-gray-100"
				aria-label="Go back"
			>
				<!-- Back Arrow SVG -->
				<svg
					class="w-5 h-5 mr-2"
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
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Back
			</button>
		</div>

		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">
				Service Categories
			</h1>
			<p class="text-lg text-gray-600">
				Choose a category to explore our services and products
			</p>
		</div>

		<!-- Categories Grid -->
		<div class="grid gap-6" :class="gridClasses">
			<div
				v-for="category in categoriesToDisplay"
				:key="category.id"
				:class="getCategoryCardClasses(category)"
				@click="selectCategory(category)"
				@keydown.enter="selectCategory(category)"
				@keydown.space="selectCategory(category)"
				role="button"
				tabindex="0"
				:aria-label="`Select ${category.name} category`"
			>
				<!-- Category Card -->
				<div class="relative p-6 h-full flex flex-col">
					<!-- Background Pattern -->
					<div class="absolute inset-0 opacity-5">
						<div class="w-full h-full" :class="getCategoryBgClasses(category)"></div>
					</div>
					
					<!-- Category Icon/Color Indicator -->
					<div class="relative mb-4">
						<div
							class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
							:class="getCategoryBgClasses(category)"
						>
							{{ category.name.charAt(0).toUpperCase() }}
						</div>
					</div>

					<!-- Category Content -->
					<div class="relative flex-1 flex flex-col">
						<h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
							{{ category.name }}
						</h3>
						
						<p v-if="category.description" class="text-gray-600 text-sm mb-4 flex-1">
							{{ category.description }}
						</p>
						
						<!-- Action Indicator -->
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-500">
								Click to explore
							</span>
							
							<!-- Arrow Icon -->
							<svg
								class="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200"
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
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>

					<!-- Selection Indicator -->
					<div
						v-if="selectedCategory === category.id"
						class="absolute top-2 right-2"
					>
						<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
							<svg
								class="w-4 h-4 text-white"
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
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
					</div>

					<!-- Hover Overlay -->
					<div class="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg"></div>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-if="categoriesToDisplay.length === 0" class="text-center py-12">
			<div class="text-gray-400 mb-4">
				<svg
					class="w-16 h-16 mx-auto"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					/>
				</svg>
			</div>
			<h3 class="text-lg font-medium text-gray-900 mb-2">No Categories Available</h3>
			<p class="text-gray-500">Categories will appear here when they become available.</p>
		</div>
	</div>
</template>

<style scoped>
/* Custom animations for category cards */
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Focus styles for accessibility */
[role="button"]:focus {
	outline: 2px solid #3b82f6;
	outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
.group {
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects for cards */
.group:hover {
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Animation delay for staggered effect */
.grid > div:nth-child(1) { animation-delay: 0.1s; }
.grid > div:nth-child(2) { animation-delay: 0.2s; }
.grid > div:nth-child(3) { animation-delay: 0.3s; }
.grid > div:nth-child(4) { animation-delay: 0.4s; }
.grid > div:nth-child(5) { animation-delay: 0.5s; }
.grid > div:nth-child(6) { animation-delay: 0.6s; }
.grid > div:nth-child(7) { animation-delay: 0.7s; }
.grid > div:nth-child(8) { animation-delay: 0.8s; }
.grid > div:nth-child(9) { animation-delay: 0.9s; }
</style>