<script setup lang="ts">
	definePageMeta({ layout: "admin" });

	const { data: products } = await useFetch("/api/product/list", {});
</script>
<template>
	<div class="flex flex-col w-full">
		<!-- manage row -->
		<div
			class="flex flex-row content-end border-b border-dashboard-special_gray py-6 px-16"
		>
			<DashboardNavigateButton
				to="/(admin)/products/create"
				label="Create Product"
				icon="mi-add"
			/>
		</div>
		<div>
			<ul>
				<li v-for="product in products" :key="product.id">
					{{ product.nameCz }}
				</li>
			</ul>
		</div>
	</div>
</template>
