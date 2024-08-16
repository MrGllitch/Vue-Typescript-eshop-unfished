import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const newLocality = prisma.locality.create({
		data: {
			nameCz: body.nameCz,
			nameEn: body.nameEn,
			countryId: body.countryId,
		},
	});
	return newLocality;
});
