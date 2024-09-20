<script setup>
	const { notifications } = useNotification();
</script>

<template>
	<div
		class="fixed right-5 bottom-5 p-4 mb-4 rounded shadow-lg transition-opacity"
	>
		AHOJ
		<div v-for="notification in notifications">aa</div>
	</div>
	<!-- <div
		v-for="(notification, index) in notifications"
		:key="index"
		:class="[
			'fixed right-5 bottom-5 p-4 mb-4 rounded shadow-lg transition-opacity',
			notification.type === 'success' ? 'bg-green-500 text-white' : '',
			notification.type === 'error' ? 'bg-red-500 text-white' : '',
			notification.type === 'info' ? 'bg-blue-500 text-white' : '',
		]"
		:style="{ opacity: notification.isVisible ? 1 : 0 }"
	>
		<p>{{ notification.message }}</p>
		<div class="w-full bg-gray-300 rounded-full h-1 mt-2">
			<div
				class="bg-white h-1 rounded-full"
				:style="{ width: `${notification.progress}%` }"
			></div>
		</div>
	</div> -->
</template>
