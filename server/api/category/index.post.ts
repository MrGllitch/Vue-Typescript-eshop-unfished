import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const newCategory = prisma.category.create({
		data: {
			nameCz: body.nameCz,
			nameEn: body.nameEn,
		},
	});
	return newCategory;
});
