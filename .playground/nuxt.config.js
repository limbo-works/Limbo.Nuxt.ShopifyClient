export default defineNuxtConfig({
	modules: ['../src/module'],
	devtools: { enabled: true },

	shopify: {
		shop: 'limbo-example',
		token: '8d0648d7c9387bf18db775a414856630',
	},
});
