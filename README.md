<br />

<p align="center">
<img src="https://github.com/limbo-works/Limbo.Nuxt.Shopify/assets/44546482/90408dd8-2711-43f7-8490-0a654b7f7062" style="width:100px;" />
</p>

<h1 align="center"><pre>@limbo-works/shopify-client</pre></h1>

<h5 align="center">A Nuxt module for interacting with the Shopify Storefront API.</h5>

<br />
<br />

## Table of contents <!-- omit in toc -->

-   [Installation](#installation)
-   [Usage](#usage)
    -   [Composable](#composable)
    -   [Custom Queries](#custom-queries)
-   [Technical Reference](#technical-reference)
    -   [Articles](#articles)
    -   [Blogs](#blogs)
    -   [Cart](#cart)
    -   [Metaobject](#metaobject)
    -   [Pages](#pages)
    -   [Products](#products)
    -   [Shop](#shop)

<br />

## Installation

Before installing the package, make sure you have the following line in your `.npmrc` file:

```
@limbo-works:registry=https://npm.pkg.github.com
```

<br />

Then install the package with the following command:

```bash
yarn add @limbo-works/nuxt-shopify
```

<br />

Then add it to your `nuxt.config.js` file.

```javascript
export default defineNuxtConfig({
  modules: ['@limbo-works/nuxt-shopify', ... ],

  shopify: {
    shop: 'SHOP_NAME_HERE',
    token: 'SHOP_TOKEN_HERE',
    version: 'API_VERSION_HERE' // defaults to '2024-01'
  }
})
```

<br />

To generate a storefront token, you first need to add a headless channel to the shopify store (See documentation [here](https://shopify.dev/docs/custom-storefronts/getting-started/build-options#the-headless-channel)). Then, in the Shopify backoffice, go to Settings -> Apps and sales channels -> Headless, click 'Open sales channel' and then click 'Add storefront'. Afterwards, you should see a view, from where you can generate a public access token.

<br />

## Usage

### Composable

To get access to the various tools in the module, you should use the included composable.

```javascript
const shopify = useShopify();
```

<br />

The returned objects contains the following values.

```javascript
{
  query: Function,
  shop: Object,
  products: Object,
  pages: Object,
  blogs: Object,
  articles: Object,
  metaobjects: Object,
  cart: Object
}
```

<br />

### Custom Queries

To create custom queries, you can use the `query` function.<br />
Start by creating a custom graphql query (fx. `~/assets/queries/products.graphql`), see example below.<br />
The Storefront API documentation can be seen [here](https://shopify.dev/docs/api/storefront).

```graphql
query ($first: Int, $last: Int, $after: String, $before: String) {
	products(first: $first, last: $last, after: $after, before: $before) {
		edges {
			node {
				title
			}
		}
	}
}
```

<br />

The query can then be imported and passed to the `query` function alongside optional variables.

```javascript
import productsQuery from '~/assets/queries/products.graphql?raw';

const shopify = useShopify();
const result = await shopify.query(productsQuery, { first: '', after: '' });
```

<br />

## Technical Reference

### Articles

```javascript
const shopify = useShopify();

const products = await shopify.articles.get({ first: 12 });
const product = await shopify.articles.getById('ID_HERE');
```

<br />

`product.get` query: [./src/graphql/products.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/products.query.graphql)<br />
`product.getById` query: [./src/graphql/product.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/product.query.graphql)

<br />

### Blogs

```javascript
const shopify = useShopify();

const products = await shopify.blogs.get({ first: 12 });
const product = await shopify.blogs.getById('ID_HERE');
```

<br />

`blogs.get` query: [./src/graphql/blogs.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/blogs.query.graphql)<br />
`blogs.getById` query: [./src/graphql/blog.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/blogs.query.graphql)

<br />

### Cart

```javascript
const shopify = useShopify();

const { cart } = await shopify.cart.create();
await shopify.cart.addLines(cart.id, [ ... ]);
await shopify.cart.removeLines(cart.id, [ ... ]);
await shopify.cart.updateLines(cart.id, [ ... ]);
```

<br />

`cart.create` query: [./src/graphql/cart-create.mutation.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/cart-create.mutation.graphql)<br />
`cart.addLines` query: [./src/graphql/cart-lines-add.mutation.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/cart-lines-add.mutation.graphql)<br />
`cart.removeLines` query: [./src/graphql/cart-lines-remove.mutation.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/cart-lines-remove.mutation.graphql)<br />
`cart.updateLines` query: [./src/graphql/cart-lines-update.mutation.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/cart-lines-update.mutation.graphql)

<br />

### Metaobject

```javascript
const shopify = useShopify();

const products = await shopify.metaobjects.get({ first: 12 });
const product = await shopify.metaobjects.getById('ID_HERE');
```

<br />

`metaobjects.get` query: [./src/graphql/metaobjects.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/metaobjects.query.graphql)<br />
`metaobjects.getById` query: [./src/graphql/metaobject.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/metaobject.query.graphql)

<br />

### Pages

```javascript
const shopify = useShopify();

const products = await shopify.pages.get({ first: 12 });
const product = await shopify.pages.getById('ID_HERE');
```

<br />

`pages.get` query: [./src/graphql/pages.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/pages.query.graphql)<br />
`pages.getById` query: [./src/graphql/page.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/page.query.graphql)

<br />

### Products

```javascript
const shopify = useShopify();

const products = await shopify.products.get({ first: 12 });
const product = await shopify.products.getById('ID_HERE');
```

<br />

`products.get` query: [./src/graphql/products.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/products.query.graphql)<br />
`products.getById` query: [./src/graphql/product.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/product.query.graphql)

<br />

### Shop

```javascript
const shopify = useShopify();

const data = await shopify.shop.get();
```

<br />

`shop.get` query: [./src/graphql/shop.query.graphql](https://github.com/limbo-works/Limbo.Nuxt.Shopify/blob/main/src/graphql/shop.query.graphql)<br />
