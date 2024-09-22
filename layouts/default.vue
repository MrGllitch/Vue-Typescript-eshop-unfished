<script setup lang="ts">
	// import MainLogo from "~/public/MainLogo.svg";
</script>
<template>
	<div
		class="text-storefront-black bg-storefront-white min-h-screen flex flex-col"
	>
		<header
			class="flex flex-row bg-storefront-black text-storefront-white h-48"
		>
			<!-- <img src="../public/MainLogo.svg" class="w-96 h-96 absolute" /> -->
			<!-- <MainLogo class="w-1/5 h-auto absolute left-16" :fontControlled="false" /> -->
			<StorefrontMainNav></StorefrontMainNav>
		</header>
		<slot />
	</div>
</template>
