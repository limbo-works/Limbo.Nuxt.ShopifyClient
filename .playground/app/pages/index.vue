<template>
	<div class="p-index list">
		<div class="p-index__list">
			<NuxtLink to="/products">Products</NuxtLink>
			<NuxtLink to="/pages">Pages</NuxtLink>
			<NuxtLink to="/blogs">Blogs</NuxtLink>
			<NuxtLink to="/articles">Articles</NuxtLink>
			<NuxtLink to="/metaobjects">Metaobjects</NuxtLink>
			<NuxtLink to="/cart">Cart</NuxtLink>
		</div>

		<div class="preview">
			<pre v-text="data"></pre>
		</div>
	</div>
</template>

<script setup>
const shopify = useShopify();

const { data } = await useAsyncData(async () => {
	return await shopify.shop.get();
});
</script>

<style lang="postcss">
.p-index__list {
	display: flex;
	flex-direction: column;
	row-gap: 4px;
}
</style>
