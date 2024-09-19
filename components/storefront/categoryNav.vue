<script lang="ts" setup>
	const categories = await $fetch("/api/category", {
		method: "GET",
	});
</script>
<template>
	<StorefrontCategoryNavButton
		v-for="category in categories"
		:category="category"
	>
	</StorefrontCategoryNavButton>
</template>
