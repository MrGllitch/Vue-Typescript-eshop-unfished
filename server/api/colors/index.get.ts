import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const colors = await prisma.color.findMany();
	return colors;
});
