<script lang="ts" setup>
	const supabase = useSupabaseClient();

	definePageMeta({ layout: "admin" });
	let product: creationProduct = reactive({
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
		imagePaths: [],
	} as creationProduct);

	let images: File[] = [];

	const handleFilesUpdate = (files: File[]) => {
		console.log("Updated files:", files);
		images = files;
	};

	const { data: categories } = await useFetch("/api/category", {
		method: "GET",
	});

	const { data: colors } = await useFetch("/api/colors", {
		method: "GET",
	});

	const { data: owners } = await useFetch("/api/owner", {
		method: "GET",
	});

	const uploadImages = async (): Promise<string[]> => {
		console.log("Uploading images");
		console.log(images);
		const imageUrls: string[] = [];

		for (const file of images) {
			console.log("uploading file: " + file);
			const { data, error } = await supabase.storage
				.from("images")
				.upload(file.name, file);

			if (error) {
				console.error("Error uploading image:", error);
				continue; // Skip this file and continue with the next
			}

			// Get the public URL for the uploaded image
			const { data: publicURL } = supabase.storage
				.from("images")
				.getPublicUrl(data.path);

			if (publicURL) {
				imageUrls.push(publicURL.publicUrl);
			}
		}

		return imageUrls;
	};

	const addProduct = async () => {
		const imageUrls = await uploadImages();
		product.imagePaths = imageUrls;
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

		const { data: response } = await useFetch("/api/product", {
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
				price: product.price,
				imagePaths: product.imagePaths,
				categories: product.categoryIds,
				colors: product.colorIds,
			},
		});
		if (response.value?.success == true) {
			navigateTo("/(admin)/products");
		}
	};
	onMounted(async () => {
		const route = useRouter().currentRoute.value;

		console.log(route);

		if (route.query.id != null) {
			console.log("id is not null");
			const content = await $fetch(`/api/product/edit?id=${route.query.id}`, {
				method: "GET",
			});
			console.log(content);
			if (content) {
				console.log("setting product");
				Object.assign(product, content);
			}
		}
	});
</script>
<template>
	<div class="py-8 px-16 bg-dashboard-text_dark/15 w-full">
		<h2 class="text-xl font-bold col-span-2">Create Product</h2>
		<form @submit.prevent="addProduct">
			<div class="columns-1 md:columns-2 gap-4">
				<DashboardInputGroup title="Description">
					<div class="flex justify-between">
						<DashboardInput
							type="text"
							v-model="product.nameCz"
							label="Name CZ"
							placeholder="Kámen"
							:required="true"
							class="w-5/12"
						/>
						<DashboardInput
							type="text"
							v-model="product.nameEn!"
							label="Name EN"
							placeholder="Stone"
							:required="true"
							class="w-5/12"
						/>
					</div>

					<DashboardInput
						type="text"
						v-model="product.descriptionCz!"
						label="Description CZ"
						placeholder="Kámen je tvrdá hmota..."
						:required="true"
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
						:required="false"
					/>
					<div class="flex justify-between">
						<DashboardInput
							type="number"
							v-model="product.bPrice!"
							label="Buy Price"
							placeholder="100"
							:required="false"
							class="w-5/12"
						/>
						<DashboardInput
							type="number"
							v-model="product.price"
							label="Price"
							placeholder="100"
							:required="true"
							class="w-5/12"
						/>
					</div>
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

				<DashboardInputGroup title="Image">
					<DashboardImageInput
						@update:files="handleFilesUpdate"
					></DashboardImageInput>
				</DashboardInputGroup>

				<DashboardInputGroup title="Location">
					<div class="flex justify-between">
						<DashboardInput
							type="text"
							v-model="product.localityNameCz"
							label="Locality Name CZ"
							placeholder="Důl"
							:required="true"
							class="w-5/12"
						/>
						<DashboardInput
							type="text"
							v-model="product.localityNameEn"
							label="Locality Name EN"
							placeholder="Mine"
							:required="true"
							class="w-5/12"
						/>
					</div>

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
					<ul class="flex flex-row gap-2">
						<li v-for="(color, index) in colors">
							<DashboardColorInput
								:id="color.id.toString()"
								:label="color.name"
								v-model="product.colorIds"
								:value="color.id"
								:required="false"
								:color="color.color"
							/>
						</li>
					</ul>
					<div class="flex justify-stretch gap-16">
						<DashboardInput
							type="text"
							v-model="product.note"
							label="Note"
							placeholder="Very interesting..."
							:required="false"
							class="w-7/12"
						/>
						<DashboardInput
							type="number"
							v-model="product.quantity!"
							label="Quantity"
							placeholder="0"
							:required="true"
							class="w-1/12"
						/>
						<DashboardInput
							type="checkbox"
							v-model="product.visible"
							label="Visible"
							:required="false"
							class="w-1/12"
						/>
					</div>
				</DashboardInputGroup>
				<DashboardInputGroup title="Category">
					<ul>
						<li v-for="(category, index) in categories">
							<DashboardCategoryInput
								:id="category.id.toString()"
								type="checkbox"
								v-model="product.categoryIds"
								:value="category.id"
								:label="category.nameCz + ' | ' + category.nameEn"
								:required="false"
							/>
						</li>
					</ul>
				</DashboardInputGroup>
			</div>
			<button type="submit">Submit</button>
		</form>
	</div>
</template>
