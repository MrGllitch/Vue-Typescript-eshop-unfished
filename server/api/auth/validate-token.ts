import prisma from "~/lib/prisma";
import { loginUser } from "~/server/functions/loginUser";
import { formatResponse } from "~/utils/responseFormatter";

export default defineEventHandler(async (event) => {
	const token = getCookie(event, "session_token");

	if (!token) {
		return formatResponse(false, null, "Token missing");
	}

	try {
		const user_session = await prisma.session.findUnique({
			where: { sessionToken: token },
			include: {
				user: true,
			},
		});

		if (!user_session) {
			return formatResponse(false, null, "Token not found");
		}
		if (user_session.expires.getTime() - new Date().getTime() <= 0) {
			return formatResponse(false, null, "Token expired");
		}
		//todo other checks

		//todo probably dont renew token when expire is to far
		await loginUser(user_session.user.id, event, token);

		return formatResponse(
			true,
			{ id: user_session.user.id, role: user_session.user.role },
			"Token valid"
		);
	} catch (error) {
		return formatResponse(false, null, "Error: " + error);
	}
});
