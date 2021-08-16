<template>
	<div>
		<h1>Страница с постами</h1>

		<default-input v-model="searchQuery" placeholder="Поиск..."/>

		<div class="app__btns">
			<default-button @click="showDialog">
				Создать пост
			</default-button>

			<default-select v-model="selectedSort" :options="sortOptions"/>
		</div>

		<default-dialog v-model:show="visibleDialog">
			<post-form @create="createPost"/>
		</default-dialog>

		<post-list :posts="sortedAndSearchedPosts"
				   @remove="removePost"
				   v-if="!isPostLoading"
		/>
		<div v-else>Идет загрузка...</div>

<!--		<div ref="observer" class="observer"></div>-->

		<div v-intersection="loadMorePosts" class="observer"></div>

		<!--		<div class="page__wrapper">-->
		<!--			<div class="page"-->
		<!--				 v-for="pageNumber in totalPages"-->
		<!--				 :key="pageNumber"-->
		<!--				 :class="{'current-page': page === pageNumber}"-->
		<!--				 @click="changePage(pageNumber)">-->
		<!--				{{ pageNumber }}-->
		<!--			</div>-->
		<!--		</div>-->
	</div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import axios from 'axios';

export default {
	components: {
		PostList,
		PostForm
	},

	data() {
		return {
			posts: [],
			visibleDialog: false,
			isPostLoading: false,
			selectedSort: '',
			searchQuery: '',
			page: 1,
			limit: 10,
			totalPages: 0,
			sortOptions: [
				{ value: 'title', name: 'По названию' },
				{ value: 'body', name: 'По описанию' }
			]
		}
	},

	mounted() {
		this.fetchPosts();

		// const options = {
		// 	rootMargin: '0px',
		// 	threshold: 1.0
		// };
		// const callback = (entries, observer) => {
		// 	if (entries[0].isIntersecting && this.page < this.totalPages) {
		// 		this.loadMorePosts();
		// 	}
		// };
		// const observer = new IntersectionObserver(callback, options);
		//
		// observer.observe(this.$refs.observer);
	},


	methods: {
		createPost(post) {
			this.posts.push(post);
			this.visibleDialog = false;
		},
		removePost(post) {
			this.posts = this.posts.filter(p => p.id !== post.id);
		},
		showDialog() {
			this.visibleDialog = true;
		},
		// changePage(pageNumber) {
		// 	this.page = pageNumber;
		// },
		async fetchPosts() {
			this.isPostLoading = true;

			try {
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: this.page,
						_limit: this.limit
					}
				});

				this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
				this.posts = response.data;
			} catch (e) {
				alert(`Ошибка: ${e}`);
			} finally {
				this.isPostLoading = false;
			}
		},
		async loadMorePosts() {
			this.page += 1;

			try {
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: this.page,
						_limit: this.limit
					}
				});

				this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
				this.posts = [...this.posts, ...response.data];
			} catch (e) {
				alert(`Ошибка: ${e}`);
			} finally {
			}
		}
	},

	computed: {
		sortedPosts() {
			return [...this.posts].sort((postOne, postTwo) => {
				return postOne[this.selectedSort]?.localeCompare(postTwo[this.selectedSort]);
			})
		},
		sortedAndSearchedPosts() {
			return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
		}
	},

	watch: {
		// page() {
		// 	this.fetchPosts();
		// }
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
