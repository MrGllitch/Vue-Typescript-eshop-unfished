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
		cart = await prisma.cart.create({
			data: {
				accountId: userId,
				cartItems: {
					create: [],
				},
			},
			select: {
				id: true,
				cartItems: true,
			},
		});
	}

	const exists = cart.cartItems.find((item) => item.productId === product.id);
	if (exists === undefined) {
		//check if item is not reserved
		await prisma.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				cartItems: {
					create: { productId: product.id, quantity: 1 },
				},
			},
		});
		return formatResponse(
			true,
			null,
			"added product " + product.nameCz + " to cart"
		);
	} else {
		//check if the max quantity is reached
		//add quanity
		if (product.quantity > exists.quantity) {
			await prisma.cart.update({
				where: {
					id: cart.id,
				},
				data: {
					cartItems: {
						update: {
							where: {
								id: exists.id,
							},
							data: {
								quantity: {
									increment: 1,
								},
							},
						},
					},
				},
			});
			return formatResponse(true, null, "quantity increased");
		} else {
			return sendError(
				event,
				createError({ statusCode: 406, message: "Not enought items" })
			);
		}
	}
});
