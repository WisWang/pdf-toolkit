import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MergePDFView from '../components/MergePDFView.vue'
import SplitPDFView from '../components/SplitPDFView.vue'
import ImageToPDFView from '../components/ImageToPDFView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/merge', name: 'merge', component: MergePDFView },
  { path: '/split', name: 'split', component: SplitPDFView },
  { path: '/imageToPDF', name: 'imageToPDF', component: ImageToPDFView },
  { path: '/about', name: 'about', component: AboutView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
