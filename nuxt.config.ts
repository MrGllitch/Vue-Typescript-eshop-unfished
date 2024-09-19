// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
								compatibilityDate: "2024-04-03",
								experimental: {
																renderJsonPayloads: false,
								},
								supabase: {
																redirect: false,
								},
								modules: [
																"@prisma/nuxt",
																"@nuxtjs/tailwindcss",
																"@primevue/nuxt-module",
																"@nuxt/image",
																"nuxt-svgo",
																"@nuxtjs/supabase",
								],
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
								svgo: {
																autoImportPath: false,
								},
								devtools: {
																enabled: true,
								},
});
