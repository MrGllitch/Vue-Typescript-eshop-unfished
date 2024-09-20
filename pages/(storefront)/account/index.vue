<script lang="ts" setup>
	definePageMeta({
		middleware: ["auth"],
		layout: "account",
	});
	const { user, logout } = useUser();
</script>

<template>
	<div>{{ user?.id }}</div>
	<button v-on:click="logout">signout</button>
</template>
