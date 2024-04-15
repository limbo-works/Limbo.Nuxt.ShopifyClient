export function query(query, variables = {}) {
	return $fetch('/api/shopify', {
		method: 'POST',
		body: { query, variables },
	});
}
