<script lang="ts" setup>
const route = useRoute()
 const {addItem} = useCart()
</script>
<template>
	<div>ID: {{ $route.params.id }}</div>
	<button v-on:click="addItem(+$route.params.id)">add</button>
</template>
