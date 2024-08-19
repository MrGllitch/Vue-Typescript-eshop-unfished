import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const owner = await prisma.owner.upsert({
		where: { name: body.name },
		create: { name: body.name },
		update: { name: body.name },
	});
	return owner;
});
