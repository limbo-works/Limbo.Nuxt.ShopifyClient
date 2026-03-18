export default defineNuxtConfig({
	modules: ['../src/module'],
	devtools: true,
	compatibilityDate: '2026-03-18',


	shopify: {
		shop: 'limbo-example',
		token: '8d0648d7c9387bf18db775a414856630',
	},
});
