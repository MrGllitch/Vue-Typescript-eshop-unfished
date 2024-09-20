<script lang="ts" setup>
	const routes = [
		{ path: "orders", name: "Orders", icon: "mi-circle-information" },
		{ path: "bought", name: "Bought", icon: "mi-circle-check" },
		{ path: "details", name: "Details", icon: "mi-map" },
		{ path: "settings", name: "Settings", icon: "mi-settings" },
		{ path: "logout", name: "logout", icon: "mi-log-out" },
	];
</script>
<template>
	<StorefrontAccNavButton
		v-for="route in routes"
		:path="route.path"
		:icon="route.icon"
		:name="route.name"
	>
	</StorefrontAccNavButton>
</template>
