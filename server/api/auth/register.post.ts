import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import { formatResponse } from "~/utils/responseFormatter";

export default defineEventHandler(async (event) => {
	const { email, password, name } = await readBody(event);

	try {
		//if (!email || !password || !name) {
		//	return sendError(
		//		event,
		//		createError({ statusCode: 400, message: "Missing required fields" })
		//	);
		//}

		const existingUser = await prisma.account.findUnique({
			where: { email },
		});

		if (existingUser) {
			return sendError(
				event,
				createError({ statusCode: 400, message: "User already exists" })
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.account.create({
			data: {
				id: crypto.randomUUID(),
				email,
				password: hashedPassword,
			},
		});

		return formatResponse(true, null, "Register succesfull");
	} catch (error) {
		console.error("Registration error:", error);
		return sendError(
			event,
			createError({ statusCode: 500, message: "Internal server error" })
		);
	}
});
