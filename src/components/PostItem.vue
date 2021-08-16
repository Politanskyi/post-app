<template>
	<div class="post">
		<div>
			<div><strong>Номер:</strong> {{ post.id }}</div>
			<div><strong>Название:</strong> {{ post.title }}</div>
			<div><strong>Описание:</strong> {{ post.body }}</div>
		</div>

		<div class="post__btns">
			<default-button @click="$router.push(`/posts/${post.id}`)">
				Открыть
			</default-button>

			<default-button @click="$emit('remove', post)"
							style="margin-left: 10px;">
				Удалить
			</default-button>
		</div>
	</div>

</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			required: true
		}
	}
}
</script>

<style scoped>
.post {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border: 2px solid teal;
	margin-top: 15px;
}

.post__btns {
	display: flex;
	margin-left: 20px;
}
</style>
