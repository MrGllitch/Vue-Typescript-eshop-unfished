<script setup>
	const { notifications, removeNotification } = useNotification();

</script>

<template>
	<TransitionGroup
		name="list"
		tag="ul"
		class="fixed right-5 bottom-5 p-4 mb-4 rounded flex flex-col-reverse w-1/5"
	>
		<li
			v-for="notification in notifications"
			:key="notification"
			class="p-4 flex flex-row align-middle justify-between mb-4 rounded"
			:class="[
				notification.type === 'success' ? 'bg-green-500 text-white' : '',
				notification.type === 'error' ? 'bg-red-500 text-white' : '',
				notification.type === 'info'
					? 'bg-storefront-black text-storefront-white'
					: '',
			]"
		>
			<p>{{ notification.message }}</p>
			<div>
				<button @click="removeNotification(notification)">
					<i class="mi-remove text-storefront-special" />
				</button>
			</div>
		</li>
	</TransitionGroup>
</template>

<style scoped>
	.list-enter-active,
	.list-leave-active {
		transition: opacity 0.5s ease;
	}
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
	}
</style>
