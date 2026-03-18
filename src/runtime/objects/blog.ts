import { query } from '../graphql-client.js';
import blogsQuery from '../graphql/blogs.query.graphql?raw';
import blogQuery from '../graphql/blog.query.graphql?raw';

/**
 * Fetches a list of blogs from Shopify.
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
	const response: any = await query(blogsQuery, variables);

	const info = response.data?.blogs?.pageInfo;
	const blogs = response.data?.blogs?.edges?.map((edge: any) => edge.node);

	return blogs ? { blogs, info } : response;
}

/**
 * Fetches a single blog from Shopify.
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
async function getById(id: string) {
	const variables = { id };
	const response: any = await query(blogQuery, variables);
	const data = response.data?.blog;

	return data ? { data } : response;
}

export default {
	get,
	getById,
};
