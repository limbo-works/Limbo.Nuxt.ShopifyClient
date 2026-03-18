export const query = (query: string, variables: Record<string, any> = {}) => {
	return $fetch('/api/shopify', {
		method: 'POST',
		body: { query, variables },
	});
};
