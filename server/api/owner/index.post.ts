import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const newOwner = prisma.owner.create({
		data: {
			name: body.name,
		},
	});
	return newOwner;
});
