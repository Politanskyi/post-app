<template>
	<form @submit.prevent>
		<h4>Создание поста</h4>
		<default-input v-model="post.title" placeholder="Название"/>

		<default-input v-model="post.body" placeholder="Описание"/>

		<default-button @click="createPost"
						style="align-self: flex-end; margin-top: 15px;">
			Создать
		</default-button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			post: {
				title: '',
				body: ''
			}
		}
	},

	methods: {
		createPost() {
			this.post.id = Date.now();
			this.$emit('create', this.post);
			this.post = {
				title: '',
				body: ''
			}
		}
	}
}
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
}
</style>
