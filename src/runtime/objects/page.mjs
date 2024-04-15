import { query } from '../graphql-client.mjs';
import pagesQuery from '../graphql/pages.query.graphql?raw';
import pageQuery from '../graphql/page.query.graphql?raw';

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
async function get(options = {}) {
	const variables = Object.assign({ first: 12 }, options);
	const response = await query(pagesQuery, variables);

	const pages = response.data?.pages?.edges?.map(({ node }) => node);
	const info = response.data?.pages?.pageInfo;
	return pages ? { pages, info } : response;
}

/**
 * Fetches a single page from Shopify.
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
async function getById(id) {
	const response = await query(pageQuery, { id });
	const data = response.data?.page;
	return data ? { data } : response;
}

export default {
	get,
	getById,
};
