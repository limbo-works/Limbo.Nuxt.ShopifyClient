import { query } from './graphql-client';

import shop from './objects/shop';
import products from './objects/product';
import pages from './objects/page';
import blogs from './objects/blog';
import articles from './objects/article';
import metaobjects from './objects/metaobject';
import cart from './objects/cart';

export function useShopify() {
	return {
		query,
		shop,
		products,
		pages,
		blogs,
		articles,
		metaobjects,
		cart,
	};
}
