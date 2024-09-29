import prisma from "~/lib/prisma";

export async function isUserAuthenthicated(
	token: string | undefined
): Promise<boolean> {
	if (token === undefined) return false;

	const user_session = await prisma.session.findUnique({
		where: { sessionToken: token },
		include: {
			user: true,
		},
	});

	if (!user_session) {
		return false;
	}
	if (user_session.expires.getTime() - new Date().getTime() <= 0) {
		return false;
	}
	return true;
}
