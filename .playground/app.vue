<template>
	<main>
		<NuxtPage />
	</main>
</template>

<style lang="postcss">
body {
	padding: 64px;
}

main {
	max-width: 800px;
	margin: 0 auto;
}

.list {
	display: flex;
	flex-direction: column;
	row-gap: 32px;
}

.preview {
	padding: 24px 48px 36px 48px;
	background-color: rgb(240, 240, 240);
	max-height: 400px;
	overflow: auto;
}

button a {
	color: inherit;
	text-decoration: none;
}
</style>
