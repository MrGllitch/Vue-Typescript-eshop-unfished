import prisma from "~/lib/prisma";
import { getIdByToken } from "~/server/functions/getIdByToken";
import { formatResponse } from "~/utils/responseFormatter";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const token = getCookie(event, "session_token");

	const userId = await getIdByToken(token);

	if (!userId) {
		return sendError(
			event,
			createError({ statusCode: 401, message: "Unauthorized" })
		);
	}
	const product = await prisma.product.findUnique({
		where: {
			id: body.productId,
		},
	});

	if (!product) {
		return sendError(
			event,
			createError({ statusCode: 404, message: "Product not found" })
		);
	}

	let cart = await prisma.cart.findUnique({
		where: {
			accountId: userId,
		},
		select: {
			id: true,
			cartItems: true,
		},
	});

	if (!cart) {
		return sendError(
			event,
			createError({ statusCode: 404, message: "Cart not found" })
		);
	}

	await prisma.cartItem.deleteMany({
		where: { productId: product.id, cartId: cart.id },
	});
	return formatResponse(true, null, "Item removed");
});
