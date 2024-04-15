import { defineEventHandler, readBody } from 'h3';
import { useRuntimeConfig } from '#nitro';

export default defineEventHandler(async (event) => {
	const { shopify: options } = useRuntimeConfig();
	const { query, variables } = await readBody(event);

	return await $fetch(options.api, {
		method: 'POST',
		headers: { 'X-Shopify-Storefront-Access-Token': options.token },
		body: { query, variables },
	});
});
