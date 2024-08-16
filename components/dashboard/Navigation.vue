<script setup lang="ts">
	const route = useRoute();
	const routes = [
		{ path: "/dashboard", name: "Dashboard", icon: "mi-layout" },
		{ path: "/(admin)/orders", name: "Orders", icon: "mi-clipboard-list" },
		{ path: "/(admin)/products", name: "Products", icon: "mi-tag" },
		{ path: "/(admin)/accounts", name: "Accounts", icon: "mi-users" },
	];
</script>

<template>
	<nav
		class="flex flex-col h-full justify-start text-xl font-bold border-r border-dashboard-special_gray"
	>
		<ul class="flex flex-col content-center flex-wrap m-6 rounded-3xl gap-4">
			<li
				v-for="routeItem in routes"
				:key="routeItem.path"
				class="p-4 text-dashboard-special_gray hover:text-dashboard-text_light transition border-l-4 border-dashboard-special_gray"
				:class="{
					' border-dashboard-text_light text-dashboard-text_light ':
						route.path === routeItem.path,
				}"
			>
				<i :class="routeItem.icon" class="pr-4" />
				<NuxtLink :to="routeItem.path">
					{{ routeItem.name }}
				</NuxtLink>
			</li>
		</ul>
	</nav>
</template>
