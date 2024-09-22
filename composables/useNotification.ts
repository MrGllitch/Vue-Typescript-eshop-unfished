import type { Notification } from "~/utils/interfaces";

export const useNotification = () => {
const notifications = useState<Notification[]>('notifications', () => []);


	const addNotification = (
		message: string,
		type: "success" | "error" | "info" = "info",
		duration = 3000
	) => {
		console.log("creating");
		const notification: Notification = {
			message,
			type,
			duration,
			isVisible: true,
			progress: 100,
		};
		notifications.value.push(notification);

		// let progressInterval = setInterval(() => {
		// 	notification.progress -= 100 / (duration / 100);
		// 	if (notification.progress <= 0) {
		// 		clearInterval(progressInterval);
		// 	}
		// }, 100);

		// setTimeout(() => {
		// 	notification.isVisible = false;
		// 	setTimeout(() => {
		// 		notifications.value = notifications.value.filter(
		// 			(n) => n !== notification
		// 		);
		// 	}, 500); // Allow time for fade-out transition
		// }, duration);
	};

	function removeNotification(notification : Notification){
		const index = notifications.value.indexOf(notification);

		notifications.value.splice(index, 1);
	}

	return {
		removeNotification,
		notifications,
		addNotification,
	};
};
