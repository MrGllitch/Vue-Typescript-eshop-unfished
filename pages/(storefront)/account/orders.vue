<script lang="ts" setup>
	definePageMeta({
		middleware: ["auth"],
		layout: "account",
	});

	const { data: orders } = await useFetch("/api/orders/user");
</script>
<template>
	<div class="flex flex-col">
		<div v-if="orders && orders.length === 0">No orders found</div>
		<div v-else>
			<div v-for="order in orders" :key="order.id">
				<div class="flex justify-between">
					<div>
						<div>Order ID: {{ order.id }}</div>
						<div>Order Date: {{ order.createdAt }}</div>
					</div>
					<div>
						<div>Total: {{ order.totalPrice }}</div>
						<div>Status: {{ order.status }}</div>
					</div>
				</div>
				<div>
					orderitems xd
					<!-- <div v-for="item in order.items" :key="item.id">
						<div>{{ item.product.name }}</div>
						<div>{{ item.quantity }}</div>
						<div>{{ item.price }}</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>
