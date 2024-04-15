<template>
	<div class="list">
		<PreviewCard
			v-for="(metaobject, index) in metaobjects"
			:key="index"
			:data="metaobject"
			:to="`/metaobjects/${encodeURIComponent(metaobject.id)}`"
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
	return await shopify.metaobjects.get('contact_page', {
		first: limit.value,
	});
});

const endCursor = ref(data.value.info?.endCursor);
const hasNextPage = ref(data.value.info?.hasNextPage);
const metaobjects = ref(data.value.metaobjects);

async function fetchMore() {
	const data = await shopify.metaobjects.get({
		first: limit.value,
		after: endCursor.value,
	});

	endCursor.value = data.info?.endCursor;
	hasNextPage.value = data.info?.hasNextPage;
	metaobjects.value = metaobjects.value.concat(data.metaobjects);
}
</script>
