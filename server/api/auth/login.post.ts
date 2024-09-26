import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { formatResponse } from "~/utils/responseFormatter";
import { setSessionCookie } from "~/utils/setSessionCookie";
import { loginSchema } from "~/utils/schemas/loginSchema";

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

		const token = randomBytes(32).toString("hex");
		const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

		await prisma.session.create({
			data: {
				userId: user.id,
				sessionToken: token,
				expires,
			},
		});

		setSessionCookie(event, token, expires);

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
