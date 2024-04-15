import { query } from '../graphql-client.mjs';

import cartCreateMutation from '../graphql/cart-create.mutation.graphql?raw';
import cartAddLinesMutation from '../graphql/cart-lines-add.mutation.graphql?raw';
import cartRemoveLinesMutation from '../graphql/cart-lines-remove.mutation.graphql?raw';
import cartUpdateLinesMutation from '../graphql/cart-lines-update.mutation.graphql?raw';

/**
 * Creates a new cart in Shopify.
 * See https://shopify.dev/docs/api/storefront/2024-01/mutations/cartCreate
 *
 * @param {Record<string, any>} options
 * @param {Record<string, any>} options.input
 * @returns {Promise<Response>}
 */
async function create(options) {
	const response = await query(cartCreateMutation, options);
	return response.data?.cartCreate ?? response;
}

/**
 * Adds line items to a cart in Shopify.
 * See https://shopify.dev/docs/api/storefront/2024-01/mutations/cartLinesAdd
 *
 * @param {string} cartId
 * @param {Array<Record<string, any>>} lines
 * @returns {Promise<Response>}
 */
async function addLines(cartId, lines) {
	const variables = { cartId, lines };
	const response = await query(cartAddLinesMutation, variables);
	return response.data?.cartLinesAdd ?? response;
}

/**
 * Removes line items based on ids from a cart in Shopify.
 * See https://shopify.dev/docs/api/storefront/2024-01/mutations/cartLinesAdd
 *
 * @param {string} cartId
 * @param {Array<string>} lineIds
 * @returns {Promise<Response>}
 */
async function removeLines(cartId, lineIds) {
	const variables = { cartId, lineIds };
	const response = await query(cartRemoveLinesMutation, variables);
	return response.data?.cartLinesRemove ?? response;
}

/**
 * Updates line items in ia cart in Shopify.
 * See https://shopify.dev/docs/api/storefront/2024-01/mutations/cartLinesAdd
 *
 * @param {string} cartId
 * @param {Array<Record<string, any>>} lines
 * @returns {Promise<Response>}
 */
async function updateLines(cartId, lines) {
	const variables = { cartId, lines };
	const response = await query(cartUpdateLinesMutation, variables);
	return response.data?.cartLinesUpdate ?? response;
}

export default {
	create,
	addLines,
	removeLines,
	updateLines,
};
