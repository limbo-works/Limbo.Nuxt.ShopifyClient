import { query } from '../graphql-client.mjs';

import metaobjectsQuery from '../graphql/metaobjects.query.graphql?raw';
import metaobjectQuery from '../graphql/metaobject.query.graphql?raw';

/**
 * Fetches a list of pages from Shopify.
 *
 * @param {Record<string, any>} options
 * @param {number} options.first Number of pages to fetch after
 * @param {number} options.last Number of pages to fetch before
 * @param {string} options.after Cursor id for fetching next page of items
 * @param {string} options.before Cursor id for fetching next page of items
 * @returns {Promise<Response>}
 */
async function get(type, options = {}) {
	const variables = Object.assign({ first: 12, type }, options);
	const response = await query(metaobjectsQuery, variables);
	const metaobjects = response.data?.metaobjects?.edges?.map(
		({ node }) => node
	);

	const info = response.data?.metaobjects?.pageInfo;
	return metaobjects ? { metaobjects, info } : response;
}

/**
 * Fetches a single page from Shopify.
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
async function getById(id) {
	const response = await query(metaobjectQuery, { id });
	const data = response.data?.metaobject;
	return data ? { data } : response;
}

export default {
	get,
	getById,
};
