export default defineNuxtRouteMiddleware(async (to, from) => {
	const { setUser, isLoggedIn } = useUser();
	const { addNotification } = useNotification();

	const token = useCookie("session_token");

	if (!token) {
		return navigateTo({ path: "/auth", query: { redirect: to.fullPath } });
	}
	if (!isLoggedIn) {
		addNotification("Not loged in", "error");
		return navigateTo({
			path: "/auth",
			query: { redirect: to.fullPath },
		});
	}

	try {
		const { data } = await useFetch("/api/auth/validate-token", {});

		if (!data.value?.success) {
			return navigateTo({
				path: "/auth",
				query: { redirect: to.fullPath, message: data.value?.message },
			});
		}

		if (data.value.data) {
			setUser(data.value.data);
		}
	} catch (error) {
		return navigateTo({ path: "/auth", query: { redirect: to.fullPath } });
	}
});
