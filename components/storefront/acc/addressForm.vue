<script lang="ts" setup>
	import * as yup from "yup";

	const schema = yup.object({
		firstName: yup.string().required("First Name is required"),
		lastName: yup.string().required("Last Name is required"),
		street: yup.string().required("Street is required"),
		houseNumber: yup.string().required("House Number is required"),
		zip: yup.string().required("ZIP is required"),
		city: yup.string().required("City is required"),
		country: yup.string().required("Country is required"),
	});

	const { handleSubmit, errors } = useForm({
		validationSchema: schema,
	});

	const { value: firstName } = useField<string | undefined>("firstName");
	const { value: lastName } = useField<string | undefined>("lastName");
	const { value: street } = useField<string | undefined>("street");
	const { value: houseNumber } = useField<string | undefined>("houseNumber");
	const { value: zip } = useField<string | undefined>("zip");
	const { value: city } = useField<string | undefined>("city");
	const { value: country } = useField<string | undefined>("country");

	const onSubmit = handleSubmit((values) => {
		console.log("Form Submitted", values);
	});
</script>

<template>
	<form @submit="onSubmit">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<StorefrontInput
				label="First Name"
				v-model="firstName"
				:error="errors.firstName"
			/>
			<StorefrontInput
				label="Last Name"
				v-model="lastName"
				:error="errors.lastName"
			/>
			<StorefrontInput label="Street" v-model="street" :error="errors.street" />
			<StorefrontInput
				label="House Number"
				v-model="houseNumber"
				:error="errors.houseNumber"
			/>
			<StorefrontInput label="Zip" v-model="zip" :error="errors.zip" />
			<StorefrontInput label="City" v-model="city" :error="errors.city" />
			<StorefrontInput
				label="Country"
				v-model="country"
				:error="errors.country"
			/>
		</div>
		<button type="submit">Submit</button>
	</form>
</template>
