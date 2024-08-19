import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const owners = prisma.owner.findMany({});
	return owners;
});
