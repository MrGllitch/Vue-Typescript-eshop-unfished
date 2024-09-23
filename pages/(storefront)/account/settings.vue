<script lang="ts" setup>
	definePageMeta({
		middleware: ["auth"],
		layout: "account",
	});
</script>
<template>
	<div>
		<StorefrontAccAddressForm />
	</div>
</template>
