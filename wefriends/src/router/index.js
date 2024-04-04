import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import Home from '@/views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login.vue'
import Forgot from '@/views/Forgot.vue'
import Profile from '@/views/Profile.vue'
import ViewProfile from '@/views/ViewProfile.vue'
import Forum from '@/views/Forum.vue'
import Clinics from '@/views/Clinics.vue'
import Education from '@/views/Education.vue'
import Diary from '@/views/Diary.vue'
import PostPage from '@/components/PostPage.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: Landing
    }, 
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/forgot',
        name: 'Forgot',
        component: Forgot
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/education',
        name: 'Education',
        component: Education
    },
    {
        path: '/diary',
        name: 'Diary',
        component: Diary
    },
    {
        path: '/clinics',
        name: 'Clinics',
        component: Clinics
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/profile/:username',
        name: 'ViewProfile',
        component: ViewProfile,
        props: true
    },
    {
        path: '/post/:postId', // Dynamic route with postId parameter
        name: 'PostPage',
        component: PostPage,
        props: true
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router