import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const newDetails = prisma.productDetails.create({
		data: {
			depth: body.depth,
			height: body.height,
			weight: body.weight,
			width: body.width,
		},
	});
	return newDetails;
});
