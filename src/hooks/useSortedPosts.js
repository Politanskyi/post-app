import { ref, computed } from 'vue';

export default function useSortedPosts(posts) {
	const selectedSort = ref('');

	const sortedPosts = computed(()=> {
		return [...posts.value].sort((postOne, postTwo) => {
			return postOne[selectedSort.value]?.localeCompare(postTwo[selectedSort.value]);
		})
	});

	return {
		selectedSort, sortedPosts
	}
}
