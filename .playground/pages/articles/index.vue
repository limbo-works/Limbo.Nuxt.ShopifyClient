<template>
	<div class="list">
		<PreviewCard
			v-for="(article, index) in articles"
			:key="index"
			:data="article"
			:to="`/articles/${encodeURIComponent(article.id)}`"
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
	return await shopify.articles.get({
		first: limit.value,
	});
});

const endCursor = ref(data.value.info?.endCursor);
const hasNextPage = ref(data.value.info?.hasNextPage);
const articles = ref(data.value.articles);

async function fetchMore() {
	const data = await shopify.articles.get({
		first: limit.value,
		after: endCursor.value,
	});

	endCursor.value = data.info?.endCursor;
	hasNextPage.value = data.info?.hasNextPage;
	articles.value = articles.value.concat(data.articles);
}
</script>
