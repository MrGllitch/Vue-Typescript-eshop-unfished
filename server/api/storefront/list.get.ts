import prisma from "~/lib/prisma";
import { creationProduct, listProduct } from "~/utils/interfaces";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	//const id = parseInt(query.id as string, 10);
	//const cz?

	// Extract filter parameters from the query
	const categorySlug = query.categorySlug ? query.categorySlug : undefined;
	//const localityId = query.localityId
	//	? parseInt(query.localityId as string, 10)
	//	: undefined;
	//const minPrice = query.minPrice
	//	? parseFloat(query.minPrice as string)
	//	: undefined;
	//const maxPrice = query.maxPrice
	//	? parseFloat(query.maxPrice as string)
	//	: undefined;
	//const sizes = query.sizes ? (query.sizes as string).split(",") : [];
	//const colors = query.colors ? (query.colors as string).split(",") : [];

	const products = await prisma.product.findMany({
		where: {
			visible: true,
			...(categorySlug && {
				categories: {
					some: {
						slug: {
							equals: categorySlug.toString(),
						},
					},
				},
			}),
		},
		select: {
			id: true,
			nameCz: true,
			nameEn: true,
			createdAt: true,
			locality: {
				select: {
					nameCz: true,
					nameEn: true,
					country: {
						select: {
							nameCz: true,
							nameEn: true,
						},
					},
				},
			},
			prices: {
				orderBy: {
					startDate: "desc",
				},
				select: {
					value: true,
					sale: true,
					startDate: true,
					endDate: true,
				},
			},
			productImages: {
				select: {
					path: true,
				},
				take: 1,
			},
		},
	});

	if (products) {
		const mappedProducts: listProduct[] = products.map((product) => {
			const { id, nameCz, createdAt, locality, prices, productImages } =
				product;

			const currentDate = new Date();
			let actualPrice = null;
			let oldPrice = null;
			let isNew = false;

			//hopefuly 30 days?
			if (currentDate.getTime() - createdAt.getTime() <= 2592000000) {
				isNew = true;
			}

			for (const price of prices) {
				if (
					price.startDate <= currentDate &&
					(!price.endDate || price.endDate >= currentDate)
				) {
					actualPrice = price;
					break;
				}
			}

			//prices sorted desc so first is the old price
			oldPrice = prices[prices.length - 1].value;

			const imagePath =
				productImages?.[0]?.path ??
				"https://sxdmnnywrupdcoxsfwhq.supabase.co/storage/v1/object/public/images/4.jpg"; // placeholder
			const { nameCz: localityName } = locality || {};
			const { nameCz: countryName } = locality?.country || {};

			return {
				id,
				name: nameCz,
				price: actualPrice ? actualPrice.value : 0,
				isSale: actualPrice ? actualPrice.sale : false,
				isNew,
				oldPrice,
				imagePath,
				countryName,
				localityName,
			};
		});

		return mappedProducts; // Return the mapped products
	}

	// Handle cases where no products are found (optional)
	const emptyProduct: listProduct[] = [];

	return emptyProduct;
});
