export const useUser = () => {
	const user = useState<User | null>("user", () => null);

	const setUser = (userData: User) => {
		user.value = userData;
	};

	const logout = async () => {
		await $fetch("api/auth/logout");
		user.value = null;
		await navigateTo({
			path: "/auth",
			query: { message: "loged out" },
		});
	};

	const isLoggedIn = (user: User | null) => {
		if (user) return true;

		return false;
	};

	return { user, setUser, isLoggedIn, logout };
};
