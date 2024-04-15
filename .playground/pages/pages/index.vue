<template>
	<div class="list">
		<PreviewCard
			v-for="(page, index) in pages"
			:key="index"
			:data="page"
			:to="`/pages/${encodeURIComponent(page.id)}`"
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
	return await shopify.pages.get({
		first: limit.value,
	});
});

const endCursor = ref(data.value.info?.endCursor);
const hasNextPage = ref(data.value.info?.hasNextPage);
const pages = ref(data.value.pages);

async function fetchMore() {
	const data = await shopify.pages.get({
		first: limit.value,
		after: endCursor.value,
	});

	endCursor.value = data.info?.endCursor;
	hasNextPage.value = data.info?.hasNextPage;
	pages.value = pages.value.concat(data.pages);
}
</script>
