import type { Notification } from "~/utils/interfaces";

export const useNotification = () => {
	const notifications = useState<Notification[]>("notifications", () => []);

	const addNotification = (
		message: string,
		type: "success" | "error" | "info" = "info",
		duration = 3000
	) => {
		const notification: Notification = {
			message,
			type,
			duration,
		};
		notifications.value.push(notification);

		setTimeout(() => {
			removeNotification(notification);
		}, duration);
	};

	function removeNotification(notification: Notification) {
		const index = notifications.value.indexOf(notification);

		notifications.value.splice(index, 1);
	}

	return {
		removeNotification,
		notifications,
		addNotification,
	};
};
