<script lang="ts" setup>
	const { cartItems, removeItem, updateCart } = useCart();

	onMounted(() => {
		updateCart();
	});
</script>

<template>
	<div v-for="item in cartItems" class="flex flex-row">
		<h4>{{ item.id }}</h4>
		<div>{{ item.nameCz }}</div>
		<button v-on:click="removeItem(item.id)">Remove</button>
	</div>

	<div>
		<button>
			to checkout
		</button>
	</div>
</template>
