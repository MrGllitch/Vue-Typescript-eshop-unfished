<script setup lang="ts">
interface Region {
	id: string;
	name: string;
	path: string;
	center?: { x: number; y: number };
}

interface Props {
	regions?: Region[];
	selectedRegion?: string;
	showBackButton?: boolean;
}

interface Emits {
	(e: 'select-region', region: Region): void;
	(e: 'back'): void;
}

const props = withDefaults(defineProps<Props>(), {
	regions: () => [],
	selectedRegion: '',
	showBackButton: true
});

const emit = defineEmits<Emits>();

const hoveredRegion = ref<string>('');
const tooltipPosition = ref({ x: 0, y: 0 });
const showTooltip = ref(false);

// Default Czech Republic regions (simplified paths for demonstration)
const defaultRegions: Region[] = [
	{
		id: 'prague',
		name: 'Praha',
		path: 'M150,180 L170,180 L170,200 L150,200 Z',
		center: { x: 160, y: 190 }
	},
	{
		id: 'central-bohemia',
		name: 'Středočeský kraj',
		path: 'M120,150 L200,150 L200,220 L120,220 Z',
		center: { x: 160, y: 185 }
	},
	{
		id: 'south-bohemia',
		name: 'Jihočeský kraj',
		path: 'M100,220 L200,220 L200,280 L100,280 Z',
		center: { x: 150, y: 250 }
	},
	{
		id: 'pilsen',
		name: 'Plzeňský kraj',
		path: 'M60,150 L120,150 L120,220 L60,220 Z',
		center: { x: 90, y: 185 }
	},
	{
		id: 'karlovy-vary',
		name: 'Karlovarský kraj',
		path: 'M60,100 L120,100 L120,150 L60,150 Z',
		center: { x: 90, y: 125 }
	},
	{
		id: 'usti',
		name: 'Ústecký kraj',
		path: 'M120,100 L180,100 L180,150 L120,150 Z',
		center: { x: 150, y: 125 }
	},
	{
		id: 'liberec',
		name: 'Liberecký kraj',
		path: 'M180,100 L240,100 L240,150 L180,150 Z',
		center: { x: 210, y: 125 }
	},
	{
		id: 'hradec-kralove',
		name: 'Královéhradecký kraj',
		path: 'M240,100 L300,100 L300,150 L240,150 Z',
		center: { x: 270, y: 125 }
	},
	{
		id: 'pardubice',
		name: 'Pardubický kraj',
		path: 'M240,150 L300,150 L300,200 L240,200 Z',
		center: { x: 270, y: 175 }
	},
	{
		id: 'vysocina',
		name: 'Kraj Vysočina',
		path: 'M200,200 L260,200 L260,260 L200,260 Z',
		center: { x: 230, y: 230 }
	},
	{
		id: 'south-moravia',
		name: 'Jihomoravský kraj',
		path: 'M200,260 L300,260 L300,320 L200,320 Z',
		center: { x: 250, y: 290 }
	},
	{
		id: 'olomouc',
		name: 'Olomoucký kraj',
		path: 'M260,150 L320,150 L320,220 L260,220 Z',
		center: { x: 290, y: 185 }
	},
	{
		id: 'zlin',
		name: 'Zlínský kraj',
		path: 'M280,220 L340,220 L340,280 L280,280 Z',
		center: { x: 310, y: 250 }
	},
	{
		id: 'moravian-silesian',
		name: 'Moravskoslezský kraj',
		path: 'M320,120 L380,120 L380,200 L320,200 Z',
		center: { x: 350, y: 160 }
	}
];

const regionsToDisplay = computed(() => props.regions.length > 0 ? props.regions : defaultRegions);

// Handle region selection
const selectRegion = (region: Region) => {
	emit('select-region', region);
};

// Handle region hover
const handleMouseEnter = (event: MouseEvent, region: Region) => {
	hoveredRegion.value = region.id;
	updateTooltipPosition(event);
	showTooltip.value = true;
};

const handleMouseMove = (event: MouseEvent) => {
	if (hoveredRegion.value) {
		updateTooltipPosition(event);
	}
};

const handleMouseLeave = () => {
	hoveredRegion.value = '';
	showTooltip.value = false;
};

// Update tooltip position
const updateTooltipPosition = (event: MouseEvent) => {
	tooltipPosition.value = {
		x: event.clientX + 10,
		y: event.clientY - 10
	};
};

// Handle back button
const handleBack = () => {
	emit('back');
};

// Get region class for styling
const getRegionClass = (region: Region) => {
	const baseClass = 'transition-all duration-200 cursor-pointer stroke-2';
	const isSelected = props.selectedRegion === region.id;
	const isHovered = hoveredRegion.value === region.id;
	
	if (isSelected) {
		return `${baseClass} fill-blue-500 stroke-blue-700`;
	} else if (isHovered) {
		return `${baseClass} fill-blue-200 stroke-blue-400`;
	} else {
		return `${baseClass} fill-gray-200 stroke-gray-400 hover:fill-gray-300 hover:stroke-gray-500`;
	}
};

// Get hovered region name
const hoveredRegionName = computed(() => {
	const region = regionsToDisplay.value.find(r => r.id === hoveredRegion.value);
	return region?.name || '';
});
</script>

<template>
	<div class="relative w-full max-w-4xl mx-auto">
		<!-- Back Button -->
		<div v-if="showBackButton" class="mb-4">
			<button
				@click="handleBack"
				class="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
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

		<!-- Map Container -->
		<div class="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4">
			<h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">
				Select a Region
			</h2>
			
			<!-- SVG Map -->
			<div class="flex justify-center">
				<svg
					width="400"
					height="350"
					viewBox="0 0 400 350"
					class="max-w-full h-auto"
					@mousemove="handleMouseMove"
				>
					<!-- Map Background -->
					<rect
						width="400"
						height="350"
						fill="#f8fafc"
						class="rounded-lg"
					/>
					
					<!-- Regions -->
					<g>
						<path
							v-for="region in regionsToDisplay"
							:key="region.id"
							:d="region.path"
							:class="getRegionClass(region)"
							@click="selectRegion(region)"
							@mouseenter="handleMouseEnter($event, region)"
							@mouseleave="handleMouseLeave"
							:aria-label="`Select ${region.name}`"
							role="button"
							tabindex="0"
							@keydown.enter="selectRegion(region)"
							@keydown.space="selectRegion(region)"
						/>
					</g>
					
					<!-- Region Labels (for better accessibility) -->
					<g class="pointer-events-none">
						<text
							v-for="region in regionsToDisplay"
							:key="`label-${region.id}`"
							:x="region.center?.x || 0"
							:y="region.center?.y || 0"
							text-anchor="middle"
							dominant-baseline="middle"
							class="text-xs fill-gray-600 font-medium"
							:class="{
								'fill-white': selectedRegion === region.id,
								'fill-gray-800': hoveredRegion === region.id
							}"
						>
							{{ region.name }}
						</text>
					</g>
				</svg>
			</div>

			<!-- Legend -->
			<div class="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
				<div class="flex items-center">
					<div class="w-4 h-4 bg-gray-200 border border-gray-400 rounded mr-2"></div>
					<span>Available</span>
				</div>
				<div class="flex items-center">
					<div class="w-4 h-4 bg-blue-200 border border-blue-400 rounded mr-2"></div>
					<span>Hovered</span>
				</div>
				<div class="flex items-center">
					<div class="w-4 h-4 bg-blue-500 border border-blue-700 rounded mr-2"></div>
					<span>Selected</span>
				</div>
			</div>
		</div>

		<!-- Tooltip -->
		<Teleport to="body">
			<Transition
				enter-active-class="transition ease-out duration-200"
				enter-from-class="opacity-0 scale-95"
				enter-to-class="opacity-100 scale-100"
				leave-active-class="transition ease-in duration-150"
				leave-from-class="opacity-100 scale-100"
				leave-to-class="opacity-0 scale-95"
			>
				<div
					v-if="showTooltip && hoveredRegionName"
					class="fixed z-50 px-2 py-1 text-sm text-white bg-gray-800 rounded shadow-lg pointer-events-none"
					:style="{
						left: `${tooltipPosition.x}px`,
						top: `${tooltipPosition.y}px`
					}"
				>
					{{ hoveredRegionName }}
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<style scoped>
/* Ensure smooth transitions for all interactive elements */
path {
	transition: all 0.2s ease;
}

/* Focus styles for accessibility */
path:focus {
	outline: 2px solid #3b82f6;
	outline-offset: 2px;
}

/* Text selection prevention for better UX */
svg text {
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}
</style>