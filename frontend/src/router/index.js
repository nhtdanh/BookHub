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
      {
        path: 'bookmarks',
        name: 'Bookmarks',
        component: () => import('@/views/BookmarkView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'borrowings',
        name: 'Borrowings',
        component: () => import('@/views/BorrowingView.vue'),
        meta: { requiresAuth: true },
      },
      { path: 'profile', name: 'Profile', component: () => import('@/views/ProfileView.vue') },
      {
        path: 'profile/edit',
        name: 'EditProfile',
        component: () => import('@/views/EditProfile.vue'),
      },
      { path: 'profile/avatar', name: 'Avatar', component: () => import('@/views/AvatarView.vue') },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
        meta: { hideNavbar: true },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/RegisterView.vue'),
        meta: { hideNavbar: true },
      },
      {
        path: '/books',
        name: 'BookList',
        component: () => import('@/views/BookView.vue'),
      },
    ],
  },
  {
    path: '/staff',
    component: () => import('@/layouts/StaffLayout.vue'),
    meta: { requiresAuth: true, requiresStaff: true },
    children: [
      {
        path: '',
        name: 'StaffDashboard',
        component: () => import('@/views/staff/DashboardView.vue'),
      },
      {
        path: 'books',
        name: 'BookManage',
        component: () => import('@/views/staff/BookManage.vue'),
      },
      {
        path: 'publishers',
        name: 'PublisherManage',
        component: () => import('@/views/staff/PublisherManage.vue'),
      },
      {
        path: 'categories',
        name: 'CategoryManage',
        component: () => import('@/views/staff/CategoryManage.vue'),
      },
      {
        path: 'borrows',
        name: 'BorrowManage',
        component: () => import('@/views/staff/BorrowManage.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue'),
    meta: { hideNavbar: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//yêu cầu đăng nhập với 1 số link
import { useUserStore } from '@/stores/userStore'
import Cookies from 'vue-cookies'

function protectRoutes(to, from, next) {
  const store = useUserStore()
  const token = Cookies.get('accessToken')
  const isStaff = store.role === 'Nhân viên'
  console.log(store.role)

  if (to.meta.requiresAuth && (!token || !store.isLoggedIn)) {
    sessionStorage.setItem('intended_route', to.fullPath)
    return next({ name: 'Login' })
  }

  if (to.name === 'Home' && isStaff) {
    return next({ name: 'StaffDashboard' })
  }

  if (to.meta.requiresStaff && !isStaff) {
    return next({ name: 'NotFound' })
  }

  next()
}

router.beforeEach(protectRoutes)
export default router
