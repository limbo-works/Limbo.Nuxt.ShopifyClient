<template>
	<div class="list">
		<PreviewCard
			v-for="(blog, index) in blogs"
			:key="index"
			:data="blog"
			:to="`/blogs/${encodeURIComponent(blog.id)}`"
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
	return await shopify.blogs.get({
		limit: limit.value,
	});
});

const endCursor = ref(data.value.info?.endCursor);
const hasNextPage = ref(data.value.info?.hasNextPage);
const blogs = ref(data.value.blogs);

async function fetchMore() {
	const data = await shopify.blogs.get({
		limit: limit.value,
		after: endCursor.value,
	});

	endCursor.value = data.info?.endCursor;
	hasNextPage.value = data.info?.hasNextPage;
	blogs.value = pages.value.concat(data.blogs);
}
</script>
