<template>
	<div class="p-checkout list">
		<div class="p-checkout__list">
			<button @click="createCart">Create cart</button>
			<button v-if="data.cart?.id" @click="addLines">Add line</button>

			<button v-if="data.cart?.checkoutUrl?.length">
				<NuxtLink :to="data.cart.checkoutUrl">Checkout</NuxtLink>
			</button>
		</div>

		<div class="p-checkout__cart">
			<div
				v-for="line in lines"
				:key="`line-${line.id}`"
				class="p-checkout__cart-item"
			>
				<div class="p-checkout__cart-info">
					<div v-text="`${line.productTitle}`"></div>
					<div v-text="`Variant: ${line.variantTitle}`"></div>
					<div v-text="`Unit Price: ${line.unitPrice}`"></div>
					<div v-text="`Total Price: ${line.totalPrice}`"></div>
					<div v-text="`Quantity: ${line.quantity}`"></div>
				</div>

				<div class="p-checkout__cart-buttons">
					<button
						@click="
							() => updateQuantity(line.id, line.quantity + 1)
						"
					>
						+1
					</button>
					<button
						@click="
							() => updateQuantity(line.id, line.quantity - 1)
						"
					>
						-1
					</button>
					<button @click="() => removeLines(line.id)">Remove</button>
				</div>
			</div>
		</div>

		<PreviewCard :data="data" />
		<PreviewCard :data="lines" />
	</div>
</template>

<script setup>
const shopify = useShopify();
const data = ref({});

const ids = ref([
	'gid://shopify/ProductVariant/42861104103477',
	'gid://shopify/ProductVariant/42861137199157',
	'gid://shopify/ProductVariant/42861137264693',
	'gid://shopify/ProductVariant/42861137330229',
]);

async function createCart() {
	data.value = await shopify.cart.create();
}

async function addLines() {
	const id = ids.value[Math.floor(Math.random() * ids.value.length)];
	const lines = [{ merchandiseId: id, quantity: 1 }];
	const response = await shopify.cart.addLines(data.value.cart.id, lines);
	data.value.cart.lines = response.cart?.lines;
}

async function removeLines(id) {
	const response = await shopify.cart.removeLines(data.value.cart.id, [id]);
	data.value.cart.lines = response.cart?.lines;
}

async function updateQuantity(id, quantity) {
	const lines = [{ id, quantity }];
	const response = await shopify.cart.updateLines(data.value.cart.id, lines);
	data.value.cart.lines = response.cart?.lines;
}

const lines = computed(() => {
	if (data.value.cart?.lines?.edges) {
		return data.value.cart.lines.edges.map(({ node }) => {
			const unitPrice = parseFloat(node.merchandise?.price.amount) ?? 0;
			const totalPrice = unitPrice * node.quantity;

			return {
				id: node.id,
				quantity: node.quantity,

				productId: node.merchandise?.product.id,
				productTitle: node.merchandise?.product.title,

				variantId: node.merchandise?.id,
				variantTitle: node.merchandise?.title,
				unitPrice,
				totalPrice,
			};
		});
	}

	return [];
});
</script>

<style lang="postcss">
.p-checkout__list {
	display: flex;
	column-gap: 16px;
}

.p-checkout__cart {
	display: flex;
	flex-direction: column;
	row-gap: 16px;
}

.p-checkout__cart-item {
	position: relative;
	width: 100%;

	font-family: 'PP Neue Montreal';
	text-transform: uppercase;
	line-height: 1.3;

	display: flex;
	flex-direction: column;

	border: 1px dashed rgb(220, 220, 220);
	padding: 36px 48px 36px 48px;
}

.p-checkout__cart-buttons {
	position: absolute;
	top: 36px;
	right: 48px;

	display: flex;
	column-gap: 4px;
}

.p-checkout__cart-item > .p-checkout__cart-info > div:first-child {
	font-weight: 600;
	margin-bottom: 4px;
}

.p-checkout__cart-item > .p-checkout__cart-info > div:not(:first-child) {
	font-size: 12px;
	font-weight: 500;
}
</style>
