import { randomBytes } from "crypto";
import prisma from "~/lib/prisma";
import { H3Event } from "h3";
import { setSessionCookie } from "~/utils/setSessionCookie";

export async function loginUser(userId: string, event: H3Event) {
	const token = randomBytes(32).toString("hex");
	const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

	await prisma.session.create({
		data: {
			userId: userId,
			sessionToken: token,
			expires,
		},
	});

	setSessionCookie(event, token, expires);
}
