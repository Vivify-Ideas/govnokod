import SnippetsPreviewComponent from './../components/snippets-preview.component.vue'
import AddSnippetComponent from './../components/add-snippet.component.vue'

export const ROUTES = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './../views/home-view.component.vue'),
    redirect: {
      name: 'snippets-preview'
    },
    children: [
      {
        path: '',
        name: 'snippets-preview',
        component: SnippetsPreviewComponent
      },
      {
        path: '/add',
        name: 'add-snippet',
        meta: {
          auth: true
        },
        component: AddSnippetComponent
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      guest: true
    },
    component: () => import(/* webpackChunkName: "login" */ './../views/login-view.component.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      guest: true
    },
    component: () => import(/* webpackChunkName: "register" */ './../views/register-view.component.vue')
  }
];