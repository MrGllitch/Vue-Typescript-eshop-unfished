import { H3Event } from "h3";

export function setSessionCookie(event: H3Event, token: string, expires: Date) {
	setCookie(event, "session_token", token, {
		httpOnly: true,
		// secure: true, // Uncomment this in production
		// sameSite: 'strict', // Uncomment this for stricter cookie handling
		expires,
	});
}
