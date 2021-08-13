<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'default-button'
}
</script>

<style scoped>
.btn {
	padding: 10px 15px;
	background: none;
	color: teal;
	border: 1px solid teal;
	cursor: pointer;
}

.btn:hover {
	background: teal;
	color: white;
}
</style>
