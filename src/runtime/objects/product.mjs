import { query } from '../graphql-client';
import productsQuery from '../graphql/products.query.graphql?raw';
import productQuery from '../graphql/product.query.graphql?raw';

/**
 * Fetches a list of products from Shopify.
 *
 * @param {Record<string, any>} options
 * @param {number} options.first Number of pages to fetch after
 * @param {number} options.last Number of pages to fetch before
 * @param {string} options.after Cursor id for fetching next page of items
 * @param {string} options.before Cursor id for fetching next page of items
 * @returns {Promise<Response>}
 */
async function get(options = {}) {
	const variables = Object.assign({ first: 12 }, options);
	const response = await query(productsQuery, variables);

	const products = response.data?.products?.edges?.map(({ node }) => node);
	const info = response.data?.products?.pageInfo;
	return products ? { products, info } : response;
}

/**
 * Fetches a single product from Shopify.
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
async function getById(id) {
	const response = await query(productQuery, { id });
	const data = response.data?.product;
	return data ? { data } : response;
}

export default {
	get,
	getById,
};
