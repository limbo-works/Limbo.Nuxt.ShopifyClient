import { query } from '../graphql-client.js';

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
async function get(type: string, options: Record<string, any> = {}) {
	const variables = Object.assign({ first: 12, type }, options);
	const response: any = await query(metaobjectsQuery, variables);

	const info = response.data?.metaobjects?.pageInfo;
	const metaobjects = response.data?.metaobjects?.edges?.map(
		(edge: any) => edge.node
	);

	return metaobjects ? { metaobjects, info } : response;
}

/**
 * Fetches a single page from Shopify.
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
async function getById(id: string) {
	const response: any = await query(metaobjectQuery, { id });
	const data = response.data?.metaobject;

	return data ? { data } : response;
}

export default {
	get,
	getById,
};
