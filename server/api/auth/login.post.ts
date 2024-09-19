import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { formatResponse } from "~/utils/responseFormatter";
import { User } from "~/utils/interfaces";

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);
	try {
		const user = await prisma.account.findUnique({
			where: {
				email: email,
			},
		});

		// Check if user exists
		if (!user) {
			return sendError(
				event,
				createError({ statusCode: 401, message: "Invalid credentials" })
			);
		}

		// Verify the password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return sendError(
				event,
				createError({ statusCode: 401, message: "Invalid credentials" })
			);
		}

		const token = randomBytes(32).toString("hex");
		const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

		// Create session in the database
		await prisma.session.create({
			data: {
				userId: user.id,
				sessionToken: token,
				expires,
			},
		});

		setCookie(event, "session_token", token, {
			httpOnly: true,
			//secure: true,
			//sameSite: 'strict',
			expires,
		});

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
