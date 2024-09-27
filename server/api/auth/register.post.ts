import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import { formatResponse } from "~/utils/responseFormatter";
import { registerSchema } from "~/utils/schemas/registerSchema";
import { loginUser } from "~/server/functions/loginUser";

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const result = registerSchema.safeParse(body);

		if (!result.success) {
			const errors = result.error.errors.map((err) => ({
				field: err.path[0],
				message: err.message,
			}));
			return sendError(
				event,
				createError({
					statusCode: 400,
					message: "Validation failed",
					data: errors,
				})
			);
		}

		const { email, password } = result.data;

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

		// LOGIN USER AFTER REGISTRATION
		await loginUser(newUser.id, event);

		return formatResponse(true, null, "Registred and loged in succesfully");
	} catch (error) {
		console.error("Registration error:", error);
		return sendError(
			event,
			createError({ statusCode: 500, message: "Internal server error" })
		);
	}
});
