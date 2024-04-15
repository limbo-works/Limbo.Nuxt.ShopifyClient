import { query } from '../graphql-client.mjs';
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
	const response = await query(blogsQuery, variables);

	const blogs = response.data?.blogs?.edges?.map(({ node }) => node);
	const info = response.data?.blogs?.pageInfo;
	return blogs ? { blogs, info } : response;
}

/**
 * Fetches a single blog from Shopify.
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
async function getById(id) {
	const response = await query(blogQuery, { id });
	const data = response.data?.blog;
	return data ? { data } : response;
}

export default {
	get,
	getById,
};
