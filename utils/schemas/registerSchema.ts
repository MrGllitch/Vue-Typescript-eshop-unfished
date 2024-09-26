import { z } from "zod";

//todo
// async function checkEmailUnique(email: string): Promise<boolean> {
// 	const response = await fetch(`/api/auth/check-email?email=${email}`);
// 	const data = await response.json();
// 	return data.isUnique;
// }

export const registerSchema = z
	.object({
		email: z.string().email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters long"),
		passwordAgain: z.string().min(6, "Password confirmation is required"),
	})
	// Validate if passwords match
	.refine((data) => data.password === data.passwordAgain, {
		message: "Passwords must match",
		path: ["passwordAgain"],
	});
// todo
// .refine(async (data) => await checkEmailUnique(data.email), {
// 	message: "Email is already in use",
// 	path: ["email"], // Show error under the email field
// });

export type RegisterSchema = z.infer<typeof registerSchema>;
