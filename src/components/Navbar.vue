<template>
	<div class="navbar">
		<div class="navbar__btns">
			<default-button @click="$router.push('/posts')">Посты</default-button>
			<default-button @click="$router.push('/about')" style="margin-left: 20px;">О Компании</default-button>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style scoped>
.navbar {
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 15px;
	background: lightgray;
	box-shadow: 2px 2px 4px gray;
}

.navbar__btns {
	margin-left: auto;
}
</style>
