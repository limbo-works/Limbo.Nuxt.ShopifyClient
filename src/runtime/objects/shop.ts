import { query } from '../graphql-client';
import shopQuery from '../graphql/shop.query.graphql?raw';

/**
 * Fetches general shop information from Shopify.
 *
 * @returns {Promise<Response>}
 */
async function get() {
	const response: any = await query(shopQuery);
	const data = response.data?.shop;
	return data ? { data } : response;
}

export default {
	get,
};
