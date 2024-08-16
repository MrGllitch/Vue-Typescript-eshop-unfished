import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const newProduct = prisma.product.create({
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
		},
	});
	return newProduct;
});
