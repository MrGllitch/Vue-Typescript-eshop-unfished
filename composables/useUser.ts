export const useUser = () => {
	const { addNotification } = useNotification();

	const user = useState<User | null>("user", () => null);

	const setUser = (userData: User) => {
		user.value = userData;
	};

	const logout = async () => {
		await $fetch("api/auth/logout");
		user.value = null;
		await navigateTo({
			path: "/auth",
		});
		addNotification("Logged out", "info", 3000);
	};

	const isLoggedIn = (user: User | null) => {
		if (user) return true;

		return false;
	};

	return { user, setUser, isLoggedIn, logout };
};
