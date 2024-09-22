<script setup>
	const { notifications } = useNotification();
	watch(notifications, (newVal, oldVal) => {
  console.log("Notifications updated:", newVal);
}, { deep: true, immediate: true });

</script>

<template>
	<div
		class="fixed right-5 bottom-5 p-4 mb-4 rounded flex flex-col-reverse"
	>
	<div>
		<div
		v-for="(notification, index) in notifications"
		:key="index"
		class="p-4"
		:class="[
			notification.type === 'success' ? 'bg-green-500 text-white' : '',
			notification.type === 'error' ? 'bg-red-500 text-white' : '',
			notification.type === 'info' ? 'bg-blue-500 text-white' : '',
		]"
		:style="{ opacity: notification.isVisible ? 1 : 0 }"
	>
		<p>{{ notification.message }}</p>
		<div>
		<!-- <button :onclick="removeNotification(notification)">X</button> -->
	</div>
	</div> 


	</div>

	</div>

</template>
