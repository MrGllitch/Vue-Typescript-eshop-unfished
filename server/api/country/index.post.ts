import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
	// Parse the request body
	const { nameCz, nameEn } = await readBody(event);

	// Input validation (optional but recommended)
	if (!nameCz || !nameEn) {
		throw new Error("Both nameCz and nameEn are required");
	}

	// Check if a country with the given names exists
	let country = await prisma.country.findFirst({
		where: {
			OR: [{ nameCz: nameCz }, { nameEn: nameEn }],
		},
	});

	// If country doesn't exist, create it
	if (!country) {
		country = await prisma.country.create({
			data: {
				nameCz,
				nameEn,
			},
		});
	}

	return country;
});
