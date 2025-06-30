<script setup>
const props = defineProps({
	size: {
		type: String,
		default: 'md',
		validator: (value) => ['sm', 'md', 'lg'].includes(value)
	},
	color: {
		type: String,
		default: '#3b82f6'
	},
	thickness: {
		type: Number,
		default: 4
	},
	speed: {
		type: String,
		default: 'normal',
		validator: (value) => ['slow', 'normal', 'fast'].includes(value)
	}
});

// Size mapping
const sizeClasses = {
	sm: 'w-4 h-4',
	md: 'w-8 h-8',
	lg: 'w-12 h-12'
};

// Speed mapping for animation duration
const speedDurations = {
	slow: '2s',
	normal: '1s',
	fast: '0.5s'
};

const spinnerSize = computed(() => sizeClasses[props.size]);
const animationDuration = computed(() => speedDurations[props.speed]);
</script>

<template>
	<div
		class="inline-block animate-spin"
		:class="spinnerSize"
		:style="{ animationDuration }"
		role="status"
		aria-label="Loading"
	>
		<svg
			class="w-full h-full"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				:stroke="color"
				:stroke-width="thickness"
				stroke-linecap="round"
				stroke-dasharray="31.416"
				stroke-dashoffset="31.416"
				opacity="0.2"
			/>
			<circle
				cx="12"
				cy="12"
				r="10"
				:stroke="color"
				:stroke-width="thickness"
				stroke-linecap="round"
				stroke-dasharray="31.416"
				stroke-dashoffset="21.991"
				opacity="0.8"
			>
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					:dur="animationDuration"
					values="0 12 12;360 12 12"
					repeatCount="indefinite"
				/>
			</circle>
		</svg>
	</div>
</template>

<style scoped>
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.animate-spin {
	animation: spin linear infinite;
}
</style>