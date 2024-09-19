export const useUser = () => {
	const user = useState<User | null>("user", () => null);

	const setUser = (userData: User) => {
		user.value = userData;
	};

	const isLoggedIn = (user: User | null) => {
		if (user) return true;

		return false;
	};

	return { user, setUser, isLoggedIn };
};
