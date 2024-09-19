<script lang="ts" setup>
	definePageMeta({
		middleware: ["auth"],
	});
	const { user } = useUser();
	async function signOut() {
		await $fetch("api/auth/logout");
	}
</script>

<template>
	<div>{{ user?.id }}</div>
	<button v-on:click="signOut">signout</button>
</template>
