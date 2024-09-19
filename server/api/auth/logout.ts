import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
	const sessionToken = getCookie(event, "session_token");

	// Remove the session
	if (sessionToken) {
		await prisma.session.delete({
			where: {
				sessionToken,
			},
		});
	}

	// Clear the session cookie
	setCookie(event, "session_id", "", {
		httpOnly: true,
		maxAge: -1, // Immediately expire the cookie
		path: "/",
	});

	return { message: "Logged out successfully" };
});
