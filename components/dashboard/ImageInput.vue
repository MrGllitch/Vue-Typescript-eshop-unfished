<script lang="ts" setup>
	const emit = defineEmits<{
		(e: "update:files", files: File[]): void;
	}>();

	const files = ref<File[]>([]);

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			const selectedFiles = Array.from(input.files); // Convert FileList to an array
			files.value = [...files.value, ...selectedFiles];
			emit("update:files", files.value); // Emit the updated files list
		}
	};

	const removeImage = (index: number) => {
		if (files.value && Array.isArray(files.value)) {
			const updatedFiles = [...files.value];
			updatedFiles.splice(index, 1);
			files.value = updatedFiles;
			emit("update:files", files.value); // Emit the updated files list
		}
	};

	const getImagePreview = (file: File) => URL.createObjectURL(file);
</script>
<template>
	<div>
		<!-- File input and drop zone -->
		<label
			for="dropzone-file"
			class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
		>
			<div class="flex flex-col items-center justify-center pt-5 pb-6">
				<svg
					class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 16"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
					/>
				</svg>
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">
					SVG, PNG, JPG or GIF (MAX. 800x400px)
				</p>
			</div>
			<input
				id="dropzone-file"
				type="file"
				class="hidden"
				@change="handleFileChange"
				accept="image/*"
				multiple
			/>
		</label>

		<!-- Preview images with remove option -->
		<div class="mt-4 flex gap-4 overflow-x-auto w-full">
			<div
				v-for="(file, index) in files"
				:key="index"
				class="relative border border-dashboard-special_gray p-2 rounded-md"
			>
				<!-- Image preview -->
				<NuxtImg
					:src="getImagePreview(file)"
					alt="Image preview"
					class="m-w-32 max-w-32 w-32 h-auto rounded-md"
				/>

				<!-- Remove button -->
				<button
					@click="removeImage(index)"
					type="button"
					class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
				>
					✕
				</button>
			</div>
		</div>
	</div>
</template>
