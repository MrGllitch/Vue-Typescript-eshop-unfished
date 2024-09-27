import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import { formatResponse } from "~/utils/responseFormatter";
import { loginSchema } from "~/utils/schemas/loginSchema";
import { loginUser } from "~/server/functions/loginUser";

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);

	const validationResult = loginSchema.safeParse({ email, password });
	if (!validationResult.success) {
		const errorMessage = validationResult.error.errors[0].message;
		return sendError(
			event,
			createError({ statusCode: 400, message: errorMessage })
		);
	}

	try {
		const user = await prisma.account.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			return sendError(
				event,
				createError({ statusCode: 401, message: "Invalid credentials" })
			);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return sendError(
				event,
				createError({ statusCode: 401, message: "Invalid credentials" })
			);
		}

		await loginUser(user.id, event);

		return formatResponse(
			true,
			{ id: user.id, role: user.role } as User,
			"Login succesful"
		);
	} catch (error) {
		console.error("Login error:", error);
		return sendError(
			event,
			createError({ statusCode: 500, message: "Internal server error" })
		);
	}
});
