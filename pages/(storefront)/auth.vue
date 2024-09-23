<script lang="ts" setup>
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
		passwordAgain: "", // For registration
	});
	const status = ref<string | null>(null); // Message to show for success or error
	const isError = ref(false); // To track if it's an error message

	watch(
		() => route.query.isRegister,
		(newVal) => {
			isRegister.value = newVal === "true";
		}
	);

	const handleSubmit = async () => {
		status.value = null; // Reset status before a new request
		isError.value = false; // Reset error flag

		if (isRegister.value) {
			// Registration flow
			try {
				const { data, error } = await useFetch("/api/auth/register", {
					method: "POST",
					body: JSON.stringify({ email: auth.email, password: auth.password }),
				});

				if (error.value) {
					status.value = error.value?.message ?? "Registration failed";
					isError.value = true;
					return;
				}

				status.value = data.value?.message ?? "Registration successful!";
				await router.push(redirectTo as string);
			} catch (e) {
				status.value = "An error occurred during registration.";
				isError.value = true;
			}
		} else {
			// Login flow
			try {
				const { data, error } = await useFetch("/api/auth/login", {
					method: "POST",
					body: JSON.stringify({ email: auth.email, password: auth.password }),
				});

				if (error.value) {
					status.value = error.value?.message ?? "Login failed";
					isError.value = true;
					return;
				}
				if (data.value?.data) {
					setUser(data.value.data);
				} else {
					status.value = "Failed to retrieve user data.";
					isError.value = true;
				}

				status.value = data.value?.message ?? "Login successful!";
				await router.push(redirectTo as string);
			} catch (e) {
				status.value = "An error occurred during login.";
				isError.value = true;
			}
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
						required
					/>
					<StorefrontInput
						v-model="auth.password"
						label="Password"
						type="password"
						required
					/>

					<StorefrontInput
						v-if="isRegister"
						v-model="auth.passwordAgain"
						label="Confirm Password"
						type="password"
						required
					/>

					<span class="text-center text-storefront-special" v-if="!isRegister">
						<NuxtLink
							class="text-storefront-special underline mt-2"
							:to="{ query: { isRegister: 'true' } }"
							>Forget password?</NuxtLink
						>
					</span>

					<!-- Show status message -->
					<span
						v-if="status"
						:class="isError ? 'text-red-600' : 'text-green-600'"
						class="mt-4 text-center"
					>
						{{ status }}
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
								:to="{ query: { isRegister: 'true' } }"
								>Register</NuxtLink
							>
						</span>
						<span v-else>
							Already have an account?
							<NuxtLink
								class="text-storefront-special underline"
								:to="{ query: { isRegister: 'false' } }"
								>Login</NuxtLink
							>
						</span>
					</span>
				</div>
			</form>
		</div>
	</div>
</template>
