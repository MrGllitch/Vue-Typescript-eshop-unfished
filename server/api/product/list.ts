import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const products = await prisma.product.findMany();
	return products;
});
