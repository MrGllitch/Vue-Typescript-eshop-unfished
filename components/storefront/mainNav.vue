<script lang="ts" setup>
	const routes = [
		{ path: "/", name: "Home" },
		{ path: "/new", name: "New" },
		{ path: "/about", name: "About" },
		{ path: "/contact", name: "Contact" },
	];
</script>

<template>
	<nav class="w-full">
		<ul class="flex flex-row w-full justify-center">
			<li v-for="route in routes">
				<StorefrontMainNavButton
					:path="route.path"
					:name="route.name"
				></StorefrontMainNavButton>
			</li>
			<!-- search todo -->
			<li>
				<router-link to="/cart">Cart</router-link>
			</li>
			<li>
				<router-link to="/account">Account</router-link>
			</li>
		</ul>
	</nav>
</template>
