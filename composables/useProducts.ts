// composables/useProducts.ts
import { ref, watch } from "vue";
import { useLazyFetch } from "#app";

export function useProducts(
	categorySlug?: string,
	minPrice?: number,
	maxPrice?: number,
	colors?: string[],
	countries?: string[],
	localities?: string[]
) {
	const products = ref<listProduct[]>([]);
	const error = ref<any>(null);
	const pending = ref(true);

	const buildQueryString = () => {
		const params = new URLSearchParams();

		if (categorySlug) params.append("categorySlug", categorySlug);
		if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
		if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());
		if (colors && colors.length > 0) params.append("colors", colors.join(","));

		return params.toString();
	};

	const fetchProducts = async () => {
		const queryString = buildQueryString();

		try {
			pending.value = true; // Set loading to true
			const { data, error: fetchError } = await useLazyFetch<listProduct[]>(
				`/api/storefront/list?${queryString}`
			);

			if (fetchError.value) {
				throw fetchError.value;
			}

			products.value = data.value ?? [];
		} catch (err) {
			error.value = err;
		} finally {
			pending.value = false; // Set loading to false
		}
	};

	// Fetch products when parameters change
	watch(() => ({ categorySlug, minPrice, maxPrice, colors }), fetchProducts, {
		deep: true,
		immediate: true,
	});

	return { products, error, pending };
}
