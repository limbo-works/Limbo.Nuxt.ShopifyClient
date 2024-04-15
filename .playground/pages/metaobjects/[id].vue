<template>
	<div class="list">
		<pre v-text="data"></pre>
	</div>
</template>

<script setup>
const shopify = useShopify();
const id = useRoute().params.id;

const { data } = await useAsyncData(async () => {
	return await shopify.metaobjects.getById(id);
});
</script>
