import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main';
import PostPage from '@/pages/PostPage';
import About from '@/pages/About';
import PostSinglePage from '@/pages/PostSinglePage';

const routes = [
	{ path: '/', component: Main },
	{ path: '/posts', component: PostPage },
	{ path: '/about', component: About },
	{ path: '/posts/:id', component: PostSinglePage },
];

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
});

export default router;