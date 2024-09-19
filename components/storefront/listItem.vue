<script lang="ts" setup>
	const props = defineProps<{
		product: listProduct;
	}>();
</script>
<template>
	<article
		itemscope
		itemtype="http://schema.org/Product"
		class="flex flex-col h-full relative"
	>
		<div
			v-if="product.isNew"
			class="absolute bg-storefront-yellow p-2 rounded bottom-4 right-4"
		>
			Novinka
		</div>
		<figure class="h-4/5 overflow-hidden">
			<!-- md:h-60 lg:h-72 xl:h-80 -->
			<NuxtLink :to="{ name: 'products-id', params: { id: product.id } }">
				<picture>
					<img
						:src="product.imagePath"
						:alt="product.name"
						itemprop="image"
						class="w-full h-full object-scale-down"
					/>
				</picture>
			</NuxtLink>
		</figure>
		<div class="flex flex-col justify-center align-middle text-start p-4">
			<NuxtLink :to="{ name: 'products-id', params: { id: product.id } }">
				<h3 class="font-bold text-2xl py-2 hover:underline">
					{{ product.name }}
				</h3>
			</NuxtLink>
			<NuxtLink :to="{ query: { country: product.countryName } }">
				<h4 class="font-light hover:underline">{{ product.countryName }}</h4>
			</NuxtLink>
			<NuxtLink :to="{ query: { locality: product.localityName } }">
				<h4 class="font-light hover:underline">{{ product.localityName }}</h4>
			</NuxtLink>

			<div
				itemprop="offers"
				itemscope
				itemtype="http://schema.org/Offer"
				class="font-bold text-2xl py-2"
				:class="{ 'text-storefront-special': product.isSale }"
			>
				<data :value="product.price" itemprop="price">{{ product.price }}</data
				><span itemprop="priceCurrency" content="CZK"> Kč</span>
				<span
					class="text-xl line-through ml-4 text-storefront-black"
					v-if="product.isSale"
					>{{ product.oldPrice }} Kč</span
				>
			</div>
		</div>
	</article>
</template>
