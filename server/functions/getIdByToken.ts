import prisma from "~/lib/prisma";

export async function getIdByToken(
	token: string | undefined
): Promise<string | undefined> {
	if (token === undefined) return undefined;

	const user_session = await prisma.session.findUnique({
		where: { sessionToken: token },
		include: {
			user: true,
		},
	});

	if (!user_session) {
		return undefined;
	}
	if (user_session.expires.getTime() - new Date().getTime() <= 0) {
		return undefined;
	}
	return user_session.user.id;
}
