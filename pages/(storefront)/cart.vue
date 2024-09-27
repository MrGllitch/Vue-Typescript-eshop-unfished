<script lang="ts" setup>
  const {cartItems, removeItem} = useCart()
</script>

<template>
  <div v-for="item in cartItems">
    {{ item.productId }}
  </div>
</template>