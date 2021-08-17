<template>
	<div>
		<h1>Страница с постами</h1>

		<default-input v-model="searchQuery" placeholder="Поиск..."/>

		<div class="app__btns">
			<default-select v-model="selectedSort" :options="sortOptions"/>
		</div>

		<default-dialog v-model:show="visibleDialog">
			<post-form/>
		</default-dialog>

		<post-list :posts="sortedAndSearchedPosts"
				   v-if="!isPostsLoading"/>

		<div v-else>Идет загрузка...</div>
	</div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { usePosts } from '../hooks/usePosts';
import useSortedPosts from '../hooks/useSortedPosts';
import useSortedAndSearchedPosts from '../hooks/useSortedAndSearchedPosts';

export default {
	components: {
		PostList,
		PostForm
	},

	data() {
		return {
			visibleDialog: false,
			sortOptions: [
				{ value: 'title', name: 'По названию' },
				{ value: 'body', name: 'По описанию' }
			]
		}
	},

	setup(props) {
		const { posts, totalPages, isPostsLoading } = usePosts(10);
		const { sortedPosts, selectedSort } = useSortedPosts(posts);
		const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

		return {
			posts,
			totalPages,
			isPostsLoading,
			sortedPosts,
			selectedSort,
			searchQuery,
			sortedAndSearchedPosts
		};
	}
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
