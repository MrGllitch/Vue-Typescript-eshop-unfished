<script lang="ts" setup>
	import { loginSchema } from "~/utils/schemas/loginSchema";
	import { registerSchema } from "~/utils/schemas/registerSchema";
	import type { LocationQueryValue } from "vue-router";

	const { addNotification } = useNotification();

	const route = useRoute();
	const router = useRouter();
	const { setUser } = useUser();
	const isRegister = ref(route.query.isRegister === "true");
	const redirectTo = Array.isArray(route.query.redirect)
		? route.query.redirect
		: route.query.redirect || "/";

	let auth = reactive({
		email: "",
		password: "",
		passwordAgain: "",
	});
	let errors = reactive({
		email: "",
		password: "",
		passwordAgain: "",
	});

	watch(
		() => route.query.isRegister,
		(newVal: LocationQueryValue | LocationQueryValue[]) => {
			isRegister.value = newVal === "true";
		}
	);

	const handleSubmit = async () => {
		errors.email = "";
		errors.password = "";
		errors.passwordAgain = "";

		if (isRegister.value === true && auth.password != auth.passwordAgain) {
			errors.passwordAgain = "Passwords do not match";
			return;
		}

		const result = isRegister.value
			? await registerSchema.safeParseAsync(auth)
			: loginSchema.safeParse(auth);

		if (!result.success) {
			result.error.errors.forEach((err) => {
				const field = err.path[0] as keyof typeof errors;
				errors[field] = err.message;
			});
			return;
		}

		try {
			const endpoint = isRegister.value
				? "/api/auth/register"
				: "/api/auth/login";

			// Create the body based on the authentication type
			const body = isRegister.value
				? {
						email: auth.email,
						password: auth.password,
						passwordAgain: auth.passwordAgain,
					}
				: { email: auth.email, password: auth.password };

			// Fetch data from the API
			const { data, error } = await useFetch(endpoint, {
				method: "POST",
				body: body,
			});

			if (error.value) {
				addNotification(error.value.message, "error", 5000);
				return;
			}

			if (data.value) {
				addNotification(data.value?.message || "Success", "success", 5000);
				await router.push(redirectTo as string);
			}
		} catch (e) {
			errors.email = "An error occurred during submission";
		}
	};
</script>

<template>
	<div class="flex content-center flex-wrap justify-center flex-grow">
		<div class="xl:w-1/3 rounded-2xl border-storefront-gray border-2 p-4">
			<form class="flex flex-col" @submit.prevent="handleSubmit">
				<h2 class="text-3xl font-bold mb-8 ml-4">
					{{ isRegister ? "Register" : "Login" }}
				</h2>

				<div class="flex flex-col px-16 mb-8">
					<StorefrontInput
						v-model="auth.email"
						label="Email"
						type="email"
						:error="errors.email"
					/>
					<StorefrontInput
						v-model="auth.password"
						label="Password"
						type="password"
						:error="errors.password"
					/>

					<StorefrontInput
						v-if="isRegister"
						v-model="auth.passwordAgain"
						label="Confirm Password"
						type="password"
						:error="errors.passwordAgain"
					/>

					<span class="text-center text-storefront-special" v-if="!isRegister">
						<NuxtLink
							class="text-storefront-special underline mt-2"
							:to="{ query: { isRegister: 'true' } }"
							>Forget password?</NuxtLink
						>
					</span>

					<button
						class="transition bg-storefront-black text-storefront-white mx-8 py-4 rounded-2xl my-4 text-xl hover:bg-storefront-white border-2 border-storefront-black hover:text-storefront-black"
					>
						{{ isRegister ? "Register" : "Login" }}
					</button>

					<span class="text-center">
						<span v-if="!isRegister">
							Don't have an account?
							<NuxtLink
								class="text-storefront-special underline"
								:to="{ query: { ...route.query, isRegister: 'true' } }"
								>Register</NuxtLink
							>
						</span>
						<span v-else>
							Already have an account?
							<NuxtLink
								class="text-storefront-special underline"
								:to="{ query: { ...route.query, isRegister: 'false' } }"
								>Login</NuxtLink
							>
						</span>
					</span>
				</div>
			</form>
		</div>
	</div>
</template>
