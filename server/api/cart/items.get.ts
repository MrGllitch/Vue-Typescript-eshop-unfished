import prisma from "~/lib/prisma";
import { isUserAuthenthicated } from "~/server/functions/isUserAuthenthicated";
export default defineEventHandler(async (event) => {
	const token = getCookie(event, "session_token");

	const isUserAuth = isUserAuthenthicated(token);

	const user = await prisma.account.findFirst({
		where: {
			sessions: {
				some: {
					sessionToken: token,
				},
			},
		},
	});

	if (!user) {
		return sendError(
			event,
			createError({ statusCode: 401, message: "Unauthorized" })
		);
	}

	const cart = await prisma.cart.findUnique({
		where: {
			accountId: user.id,
		},
	});

	if (!cart) {
		return sendError(
			event,
			createError({ statusCode: 404, message: "Cart not found" })
		);
	}

	const items = await prisma.cartItem.findMany({
		where: {
			cartId: cart.id,
		},
		select: {
			product: true,
		},
	});

	const productList = items.map((item) => item.product);

	return productList || [];
});
