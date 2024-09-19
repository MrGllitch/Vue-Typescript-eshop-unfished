import { Role } from "@prisma/client";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const token = useCookie("session_token");

	if (!token) {
		return navigateTo({ path: "/auth", query: { redirect: to.fullPath } });
	}

	try {
		const { data } = await useFetch("/api/auth/validate-token", {});

		if (!data.value?.success) {
			return navigateTo({
				path: "/auth",
				query: { redirect: to.fullPath, message: data.value?.message },
			});
		}
		if (data.value?.data?.role != Role.ADMIN) {
			return navigateTo({
				path: "/auth",
				query: { redirect: to.fullPath, message: "Unauthorized" },
			});
		}
	} catch (error) {
		return navigateTo({
			path: "/auth",
			query: { redirect: to.fullPath },
		});
	}
});
