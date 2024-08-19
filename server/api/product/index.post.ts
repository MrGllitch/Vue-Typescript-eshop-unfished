import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	try {
		const newProduct = await prisma.product.create({
			data: {
				nameCz: body.nameCz,
				nameEn: body.nameEn,
				descriptionCz: body.descriptionCz,
				descriptionEn: body.descriptionEn,
				note: body.note,
				visible: body.visible,
				quantity: body.quantity,
				bPrice: body.bPrice,
				productDetails: {
					create: {
						depth: body.depth,
						height: body.height,
						weight: body.weight,
						width: body.width,
					},
				},
				owner: {
					connect: { id: body.ownerId },
				},
				locality: {
					connect: { id: body.localityId },
				},
				prices: {
					create: {
						value: body.price,
					},
				},
				categories: {
					connect: body.categories.map((c: number) => ({ id: c })),
				},
				colors: {
					connect: body.colors.map((c: number) => ({ id: c })),
				},
				productImages: {
					create: body.imagePaths.map((imagePath: string) => ({
						path: imagePath,
					})),
				},
			},
		});
		return {
			success: true,
			data: newProduct,
		};
	} catch (error) {
		console.error("Error creating product:", error);
		event.node.res.statusCode = 500;
		return { success: false, message: "Error creating product" };
	}
});
