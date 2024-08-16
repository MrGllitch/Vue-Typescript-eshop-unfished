<script lang="ts" setup>
	import {
		type Category,
		type Country,
		type Locality,
		type Product,
		type ProductDetails,
		type ProductPrice,
	} from "@prisma/client";
	import type { RefSymbol } from "@vue/reactivity";

	definePageMeta({ layout: "admin" });
	const product: creationProduct = reactive({
		id: null,
		nameCz: "",
		descriptionCz: "",
		nameEn: "",
		descriptionEn: "",
		note: "",
		visible: false,
		quantity: 1,
		bPrice: null,
		price: null,
		owner: "",
		colorIds: [],
		categoryIds: [],
		weight: null,
		height: null,
		width: null,
		depth: null,
		localityNameCz: "",
		localityNameEn: "",
		countryNameCz: "",
		countryNameEn: "",
	} as creationProduct);
	const category: Category[] = [
		{
			id: 0,
			nameCz: "Křemen",
			nameEn: "Silica",
		},
		{
			id: 1,
			nameCz: "Fostát",
			nameEn: "Phospathes",
		},
		{
			id: 2,
			nameCz: "Sulfid",
			nameEn: "Sulfides",
		},
	];

	const addProduct = async () => {
		console.log(product);
		const { data: country } = await useFetch("/api/country", {
			method: "POST",
			body: {
				nameCz: product.countryNameCz,
				nameEn: product.countryNameEn,
			},
		});
		const { data: locality } = await useFetch("/api/locality", {
			method: "POST",
			body: {
				nameCz: product.localityNameCz,
				nameEn: product.localityNameEn,
				countryId: country.value?.id,
			},
		});

		const { data: owner } = await useFetch("/api/owner", {
			method: "POST",
			body: {
				name: product.owner,
			},
		});

		await useFetch("/api/product", {
			method: "POST",
			body: {
				nameCz: product.nameCz,
				nameEn: product.nameEn,
				descriptionCz: product.descriptionCz,
				descriptionEn: product.descriptionEn,
				note: product.note,
				visible: product.visible,
				quantity: product.quantity,
				bPrice: product.bPrice,
				weight: product.weight,
				height: product.height,
				width: product.width,
				depth: product.depth,
				ownerId: owner.value?.id,
				localityId: locality.value?.id,
			},
		});
	};
</script>
<template>
	<div class="py-8 px-16 bg-dashboard-text_dark/15 w-full">
		<h2 class="text-xl font-bold col-span-2">Create Product</h2>
		<form @submit.prevent="addProduct">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<DashboardInputGroup title="Description CZ">
					<DashboardInput
						type="text"
						v-model="product.nameCz"
						label="Name CZ"
						placeholder="Kámen"
						:required="true"
						class="w-6/12"
					/>
					<DashboardInput
						type="text"
						v-model="product.descriptionCz!"
						label="Description CZ"
						placeholder="Kámen je tvrdá hmota..."
						:required="true"
					/>
				</DashboardInputGroup>

				<DashboardInputGroup title="Description EN">
					<DashboardInput
						type="text"
						v-model="product.nameEn!"
						label="Name EN"
						placeholder="Stone"
						:required="true"
						class="w-6/12"
					/>
					<DashboardInput
						type="text"
						v-model="product.descriptionEn!"
						label="Description EN"
						placeholder="Stone is a hard substance..."
						:required="true"
					/>
				</DashboardInputGroup>
				<DashboardInputGroup title="Price">
					<DashboardInput
						type="text"
						v-model="product.owner"
						label="Owner"
						placeholder="Karel"
						:required="true"
					/>
					<DashboardInput
						type="number"
						v-model="product.bPrice!"
						label="Buy Price"
						placeholder="100"
						:required="true"
					/>
					<DashboardInput
						type="number"
						v-model="product.price"
						label="Price"
						placeholder="100"
						:required="true"
					/>
				</DashboardInputGroup>
				<DashboardInputGroup title="Dimensions">
					<div class="flex flex-row gap-4">
						<DashboardInput
							type="number"
							v-model="product.weight!"
							label="Weight (kg)"
							placeholder="10"
							:required="true"
						/>
						<DashboardInput
							type="number"
							v-model="product.height!"
							label="Height (cm)"
							placeholder="10"
							:required="true"
						/>
						<DashboardInput
							type="number"
							v-model="product.width!"
							label="Width (cm)"
							placeholder="10"
							:required="true"
						/>
						<DashboardInput
							type="number"
							v-model="product.depth!"
							label="Depth (cm)"
							placeholder="10"
							:required="true"
						/>
					</div>
				</DashboardInputGroup>

				<!-- <DashboardInputGroup title="Image">
				<DashboardImageInput></DashboardImageInput>
			</DashboardInputGroup> -->

				<DashboardInputGroup title="Location">
					<DashboardInput
						type="text"
						v-model="product.localityNameCz"
						label="Locality Name CZ"
						placeholder="Důl"
						:required="true"
					/>
					<DashboardInput
						type="text"
						v-model="product.localityNameEn"
						label="Locality Name EN"
						placeholder="Mine"
						:required="true"
					/>
					<DashboardInput
						type="text"
						v-model="product.countryNameCz"
						label="State Name CZ"
						placeholder="Česká republika"
						:required="true"
					/>
					<DashboardInput
						type="text"
						v-model="product.countryNameEn"
						label="State Name EN"
						placeholder="Czech Republic"
						:required="true"
					/>
				</DashboardInputGroup>
				<DashboardInputGroup title="Details">
					<DashboardInput
						type="text"
						v-model="product.note"
						label="Note"
						placeholder="Very interesting..."
						:required="false"
					/>
					<DashboardInput
						type="number"
						v-model="product.quantity!"
						label="Quantity"
						placeholder="0"
						:required="true"
					/>
					<DashboardInput
						type="checkbox"
						v-model="product.visible"
						label="Visible"
						:required="true"
					/>
				</DashboardInputGroup>
				<button type="submit">Submit</button>
			</div>
		</form>
	</div>
</template>
