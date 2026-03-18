<template>
	<div class="list">
		<PreviewCard
			v-for="(product, index) in products"
			:key="index"
			:data="product"
			:to="`/products/${encodeURIComponent(product.id)}`"
		/>

		<div style="margin: 0 auto">
			<button v-if="hasNextPage" @click="fetchMore">Load more</button>
		</div>
	</div>
</template>

<script setup>
const shopify = useShopify();
const limit = ref(1);

const { data } = await useAsyncData(async () => {
	return await shopify.products.get({
		first: limit.value,
	});
});

const endCursor = ref(data.value.info?.endCursor);
const hasNextPage = ref(data.value.info?.hasNextPage);
const products = ref(data.value.products);

async function fetchMore() {
	const data = await shopify.products.get({
		first: limit.value,
		after: endCursor.value,
	});

	endCursor.value = data.info?.endCursor;
	hasNextPage.value = data.info?.hasNextPage;
	products.value = products.value.concat(data.products);
}
</script>
