import { fileURLToPath } from 'url';

import {
	defineNuxtModule,
	addImports,
	addServerHandler,
	createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
	meta: {
		name: 'nuxt-shopify',
		configKey: 'shopify',
		compatibility: { nuxt: '^3.0.0' },
	},

	schema: {
		shop: String,
		token: String,
		version: String,
	},

	defaults: {
		version: '2024-01',
	},

	setup(options, nuxt) {
		nuxt.options.runtimeConfig.shopify = {
			api: `https://${options.shop}.myshopify.com/api/${options.version}/graphql.json`,
			token: options.token,
		};

		const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));
		const { resolve } = createResolver(import.meta.url);

		addImports({
			name: 'useShopify',
			from: resolve(runtimeDir, 'use-shopify.mjs'),
		});

		addServerHandler({
			method: 'post',
			route: '/api/shopify',
			handler: resolve(runtimeDir, 'server/api/shopify.post.mjs'),
		});
	},
});
