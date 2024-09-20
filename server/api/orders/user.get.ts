import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
	const token = getCookie(event, "session_token");

	const orders = await prisma.order.findMany({
		where: {
			account: {
				sessions: {
					some: {
						sessionToken: token,
					},
				},
			},
		},
	});
	return orders;
});
