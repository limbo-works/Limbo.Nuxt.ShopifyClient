<template>
	<div class="c-preview-card">
		<button v-if="to?.length">
			<NuxtLink class="c-preview-card__expand" :to="to">
				View Single
			</NuxtLink>
		</button>

		<div class="c-preview-card__content">
			<pre v-text="data"></pre>
		</div>
	</div>
</template>

<script setup>
defineProps({
	data: {
		type: [String, Object],
		required: true,
	},

	to: {
		type: String,
		required: false,
	},
});
</script>

<style lang="postcss">
.c-preview-card {
	position: relative;
	background-color: rgb(240, 240, 240);
	max-height: 400px;
	width: 100%;
	padding: 24px 48px 36px 48px;
	overflow: auto;
}

.c-preview-card button {
	opacity: 0;

	display: block;
	position: sticky;
	margin-left: auto;
	top: 24px;
	right: 24px;
}

.c-preview-card:hover button {
	opacity: 1;
}
</style>
