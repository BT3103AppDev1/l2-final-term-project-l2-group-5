import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import Home from '@/views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login.vue'
import Forgot from '@/views/Forgot.vue'
import Profile from '@/views/Profile.vue'
import Forum from '@/views/Forum.vue'
import Clinics from '@/views/Clinics.vue'
import Education from '@/views/Education.vue'
import Diary from '@/views/Diary.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router