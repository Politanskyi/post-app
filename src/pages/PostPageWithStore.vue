<template>
	<div>
		<h1>Страница с постами</h1>

		<default-input :model-value="searchQuery"
					   @update:model-value="setSearchQuery"
					   placeholder="Поиск..."/>

		<div class="app__btns">
			<default-button @click="showDialog">
				Создать пост
			</default-button>

			<default-select :model-value="selectedSort"
							@update:model-value="setSelectedSort"
							:options="sortOptions"/>
		</div>

		<default-dialog v-model:show="visibleDialog">
			<post-form @create="createPost"/>
		</default-dialog>

		<post-list :posts="sortedAndSearchedPosts"
				   @remove="removePost"
				   v-if="!isPostLoading"/>

		<div v-else>Идет загрузка...</div>

		<div v-intersection="loadMorePosts" class="observer"></div>
	</div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import DefaultButton from '../components/UI/DefaultButton';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	components: {
		DefaultButton,
		PostList,
		PostForm
	},

	data() {
		return {
			visibleDialog: false
		}
	},

	mounted() {
		this.fetchPosts();
	},

	methods: {
		...mapMutations({
			setPage: 'post/setPage',
			setSearchQuery: 'post/setSearchQuery',
			setSelectedSort: 'post/setSelectedSort',
			setPosts: 'post/setPosts',
		}),
		...mapActions({
			fetchPosts: 'post/fetchPosts',
			loadMorePosts: 'post/loadMorePosts'
		}),
		createPost(post) {
			this.posts.push(post);
			this.visibleDialog = false;
		},
		removePost(post) {
			this.$store.commit('post/setPosts', this.posts.filter(p => p.id !== post.id));
		},
		showDialog() {
			this.visibleDialog = true;
		}
	},

	computed: {
		...mapState({
			posts: state => state.post.posts,
			isPostLoading: state => state.post.isPostLoading,
			selectedSort: state => state.post.selectedSort,
			searchQuery: state => state.post.searchQuery,
			page: state => state.post.page,
			limit: state => state.post.limit,
			totalPages: state => state.post.totalPages,
			sortOptions: state => state.post.sortOptions
		}),
		...mapGetters({
			sortedPosts: 'post/sortedPosts',
			sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
		})
	},

	watch: {}
}
</script>

<style>
.app__btns {
	display: flex;
	justify-content: space-between;
	margin: 15px 0;
}

.page__wrapper {
	display: flex;
	margin-top: 15px;
}

.page {
	border: 1px solid black;
	padding: 10px;
	cursor: pointer;
}

.current-page {
	border: 2px solid teal;
	cursor: default;
}

.observer {
	height: 30px;
	background: teal;
}
</style>
