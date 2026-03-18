import { query } from '../graphql-client.ts';

import articlesQuery from '../graphql/articles.query.graphql?raw';
import articleQuery from '../graphql/article.query.graphql?raw';

/**
 * Fetches a list of articles from Shopify.
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
	const response: any = await query(articlesQuery, variables);

	const info = response.data?.articles?.pageInfo;
	const articles = response.data?.articles?.edges?.map(
		(edge: any) => edge.node
	);

	return articles ? { articles, info } : response;
}

/**
 * Fetches a single article from Shopify.
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
async function getById(id: string) {
	const variables = { id };
	const response: any = await query(articleQuery, variables);
	const data = response.data?.article;

	return data ? { data } : response;
}

export default {
	get,
	getById,
};
