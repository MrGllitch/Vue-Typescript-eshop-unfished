<script setup lang="ts">
	definePageMeta({
		layout: "admin",
	});
	const seed = async () => {
		await useFetch("/api/seed");
	};
</script>
<template>
	<div>
		<button @click="seed">Seed</button>
	</div>
</template>
