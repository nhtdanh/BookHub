// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ReaderLayout from '@/layouts/ReaderLayout.vue'

const routes = [
  {
    path: '/',
    component: ReaderLayout,
    children: [
      { path: '', name: 'Home', component: () => import('@/views/HomeView.vue') },
      { path: 'book/:id', name: 'BookDetail', component: () => import('@/views/BookDetail.vue') },
      { path: 'bookmarks', name: 'Bookmarks', component: () => import('@/views/BookmarkView.vue') },
      {
        path: 'borrowings',
        name: 'Borrowings',
        component: () => import('@/views/BorrowingView.vue'),
      },
      { path: 'profile', name: 'Profile', component: () => import('@/views/ProfileView.vue') },
      {
        path: 'profile/edit',
        name: 'EditProfile',
        component: () => import('@/views/EditProfile.vue'),
      },
      { path: 'profile/avatar', name: 'Avatar', component: () => import('@/views/AvatarView.vue') },
      { path: 'login', name: 'Login', component: () => import('@/views/LoginView.vue') },
      { path: 'register', name: 'Register', component: () => import('@/views/RegisterView.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
