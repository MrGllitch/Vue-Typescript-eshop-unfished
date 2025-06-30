<script setup>
import Notification from "~/components/Notification.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";

// Step management
// Application state
const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');
const currentStep = ref(1);
const totalSteps = ref(4);

// Steps for the application flow
const steps = ref([
	{ id: 'search', name: 'Search', completed: false, current: true },
	{ id: 'region', name: 'Select Region', completed: false, current: false },
	{ id: 'category', name: 'Choose Category', completed: false, current: false },
	{ id: 'results', name: 'View Results', completed: false, current: false }
]);

// Loading state management
const startLoading = () => {
	isLoading.value = true;
	hasError.value = false;
	errorMessage.value = '';
};

const stopLoading = () => {
	isLoading.value = false;
};

const setError = (message) => {
	hasError.value = true;
	errorMessage.value = message;
	isLoading.value = false;
};

// Step navigation
const goToStep = (stepNumber) => {
	if (stepNumber >= 1 && stepNumber <= totalSteps.value) {
		currentStep.value = stepNumber;
		updateSteps();
	}
};

const nextStep = () => {
	if (currentStep.value < totalSteps.value) {
		// Mark current step as completed
		const currentStepIndex = currentStep.value - 1;
		if (steps.value[currentStepIndex]) {
			steps.value[currentStepIndex].completed = true;
		}
		
		currentStep.value++;
		updateSteps();
	}
};

const previousStep = () => {
	if (currentStep.value > 1) {
		currentStep.value--;
		updateSteps();
	}
};

const updateSteps = () => {
	steps.value.forEach((step, index) => {
		step.current = index === currentStep.value - 1;
		if (index < currentStep.value - 1) {
			step.completed = true;
		} else if (index === currentStep.value - 1) {
			step.completed = false;
		}
	});
};

// Provide global methods for child components
const appMethods = {
	startLoading,
	stopLoading,
	setError,
	goToStep,
	nextStep,
	previousStep,
	currentStep: readonly(currentStep),
	steps: readonly(steps)
};

provide('app', appMethods);

// Handle global errors
const handleError = (error) => {
	console.error('Application error:', error);
	setError(error?.message || 'An unexpected error occurred');
};

// Global error handler
onErrorCaptured((err) => {
	handleError(err);
	return false;
});
</script>

<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Global Loading Overlay -->
		<Transition
			enter-active-class="transition-opacity ease-out duration-300"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity ease-in duration-200"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-if="isLoading"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			>
				<div class="bg-white rounded-lg p-6 shadow-xl">
					<div class="flex items-center space-x-3">
						<LoadingSpinner size="md" />
						<span class="text-gray-700 font-medium">Loading...</span>
					</div>
				</div>
			</div>
		</Transition>

		<!-- Header -->
		<header class="bg-white shadow-sm border-b border-gray-200">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex items-center justify-between h-16">
					<!-- Logo -->
					<div class="flex items-center">
						<h1 class="text-xl font-bold text-gray-900">
							LamaMinerals
						</h1>
					</div>

					<!-- Navigation -->
					<nav class="hidden md:flex space-x-8">
						<a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">
							Home
						</a>
						<a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">
							Catalog
						</a>
						<a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">
							About
						</a>
						<a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">
							Contact
						</a>
					</nav>

					<!-- Mobile menu button -->
					<div class="md:hidden">
						<button
							type="button"
							class="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							aria-label="Open menu"
						>
							<svg
								class="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>

		<!-- Progress Steps -->
		<div class="bg-white border-b border-gray-200">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="py-4">
					<nav aria-label="Progress">
						<ol class="flex items-center">
							<li
								v-for="(step, stepIdx) in steps"
								:key="step.id"
								:class="[
									stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
									'relative'
								]"
							>
								<!-- Step connector -->
								<div
									v-if="stepIdx !== steps.length - 1"
									class="absolute top-4 left-4 -ml-px mt-0.5 h-0.5 w-8 sm:w-20"
									:class="step.completed ? 'bg-blue-600' : 'bg-gray-300'"
									aria-hidden="true"
								/>

								<!-- Step content -->
								<div class="group relative flex items-start">
									<span class="flex h-9 items-center">
										<span
											class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors"
											:class="[
												step.completed
													? 'border-blue-600 bg-blue-600'
													: step.current
													? 'border-blue-600 bg-white'
													: 'border-gray-300 bg-white'
											]"
										>
											<!-- Completed step -->
											<svg
												v-if="step.completed"
												class="h-5 w-5 text-white"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
													clip-rule="evenodd"
												/>
											</svg>
											<!-- Current step -->
											<span
												v-else-if="step.current"
												class="h-2.5 w-2.5 rounded-full bg-blue-600"
												aria-hidden="true"
											/>
											<!-- Future step -->
											<span
												v-else
												class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
												aria-hidden="true"
											/>
										</span>
									</span>
									<span class="ml-4 flex min-w-0 flex-col">
										<span
											class="text-sm font-medium"
											:class="step.completed || step.current ? 'text-blue-600' : 'text-gray-500'"
										>
											{{ step.name }}
										</span>
									</span>
								</div>
							</li>
						</ol>
					</nav>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<main class="flex-1">
			<!-- Error State -->
			<div
				v-if="hasError"
				class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
			>
				<div class="bg-red-50 border border-red-200 rounded-lg p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg
								class="h-5 w-5 text-red-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800">
								Error occurred
							</h3>
							<div class="mt-2 text-sm text-red-700">
								<p>{{ errorMessage }}</p>
							</div>
							<div class="mt-4">
								<button
									@click="hasError = false; errorMessage = ''"
									class="bg-red-100 px-2 py-1 text-sm font-medium text-red-800 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>
									Dismiss
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Page Content -->
			<div v-else>
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</div>
		</main>

		<!-- Notifications -->
		<Notification />
	</div>
</template>

<style scoped>
/* Smooth transitions for all elements */
* {
	transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

/* Focus styles for accessibility */
button:focus,
a:focus {
	outline: 2px solid #3b82f6;
	outline-offset: 2px;
}
</style>
