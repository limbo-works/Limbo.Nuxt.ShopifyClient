import { fileURLToPath } from 'url';

import {
	defineNuxtModule,
	addImports,
	addServerHandler,
	createResolver,
} from '@nuxt/kit';

interface ModuleOptions {
	shop: string;
	token: string;
	version: string;
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'nuxt-shopify',
		configKey: 'shopify',
		compatibility: { nuxt: '^4.0.0' },
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
			from: resolve(runtimeDir, 'use-shopify.ts'),
		});

		addServerHandler({
			method: 'post',
			route: '/api/shopify',
			handler: resolve(runtimeDir, 'server/api/shopify.post.ts'),
		});
	},
});
