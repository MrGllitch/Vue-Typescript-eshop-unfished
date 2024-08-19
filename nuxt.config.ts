// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: [
        "@prisma/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/supabase",
        "@primevue/nuxt-module",
        "@nuxt/image"
    ],
	supabase: {
		redirect: false,
	},
	prisma: {
		installStudio: false,
		generateClient: false,
	},
	css: ["mono-icons/iconfont/icons.css"],
	primevue: {
		options: {
			unstyled: true,
		},
	},
});