<script lang="ts" setup>
const route = useRoute()
 const {addItem} = useCart()
 const content = await $fetch(`/api/product/detail?id=${route.params.id}`, {
				method: "GET",
			});
</script>
<template>
	<div class="flex flex-row">
		<section>
			images
		</section>
		<aside class="flex flex-col bg-storefront-black text-storefront-white h-full">
			<h2>{{ content?.nameCz }}</h2>
			<h3>{{ content?.countryNameCz }}	</h3>
			<h3>{{ content?.localityNameCz }}	</h3>
			<hr>
			<dl>
				<dt>Šířka</dt>
				<dd>{{ content?.width }} cm</dd>
				<dt>Výška</dt>
				<dd>{{ content?.height }} cm</dd>
				<dt>Hloubka</dt>
				<dd>{{ content?.depth }} cm</dd>
				<dt>Hmotnost</dt>
				<dd>{{ content?.weight }} kg</dd>
			</dl>
			<hr>
			<h2>{{ content?.price }}</h2>
			<span>včetně DPH</span>
			<button>
				Přidat do košíku
			</button>
			<StorefrontProductDetail header = "Popis" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit accusamus iure optio quas sunt dolorum  voluptas harum, aperiam magni."/>
		</aside>
	</div>
	<div>ID: {{ $route.params.id }}</div>
	<button v-on:click="addItem(+$route.params.id)">add</button>
</template>
