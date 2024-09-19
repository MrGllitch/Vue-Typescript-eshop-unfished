<script setup lang="ts">
	const { data: products } = await useFetch("/api/product/list", {});
	definePageMeta({ layout: "admin", middleware: ["auth-admin"] });
	const edit = (id: number) => {
		navigateTo({ path: "/products/create", query: { id } });
	};
</script>
<template>
	<div class="flex flex-col w-full">
		<!-- manage row -->
		<div
			class="flex flex-row content-end border-b border-dashboard-special_gray py-6 px-16"
		>
			<AdminNavigateButton
				to="products/create"
				label="Create Product"
				icon="mi-add"
			/>
		</div>
		<div>
			<ul>
				<li
					v-for="product in products"
					:key="product.id"
					class="flex flex-row gap-4"
				>
					<h4>{{ product.nameCz }}</h4>
					<p>{{ product.bPrice }}</p>
					<p>{{ product.note }}</p>
					<p>visible: {{ product.visible }}</p>
					<Button
						@click="edit(product.id)"
						class="text-dashboard-special_gray hover:text-dashboard-text_light"
					>
						edit
					</Button>
				</li>
			</ul>
		</div>
	</div>
</template>
