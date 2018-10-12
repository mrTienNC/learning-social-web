import Vue from 'vue';
import Router from 'vue-router';
import ListCourse from '@/components/ListCourse/ListCourse';
import firebase from '../firebase/firebase';
import Login from '../components/Login-Logout/Login/Login';
import Home from '../components/Login-Logout/Logout/Home';
import Course from '../components/course/Course';
import Content from '../components/ListContent/Content';
import ListMember from '../components/Member/ListMember/listMember';
import Calendar from '../components/Calendar/Calendar';
import Pending from '../components/PendingItem/PendingItem/PendingItem';
import Profile from '../components/Profile/Profile';
import Attendance from '../components/Attendance/Attendance';
import Settings from '../components/Settings/Settings';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '*',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children: [{
                    path: 'listCourse',
                    name: 'ListCourse',
                    component: ListCourse,
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: 'Profile',
                    name: 'Profile',
                    component: Profile,
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: 'course/:id',
                    name: 'courseContent',
                    props: true,
                    component: Course,
                    children: [{
                            path: 'attendance',
                            name: 'Attendance',
                            component: Attendance,
                            props: true,
                            meta: {
                                requiresAuth: true,
                            },
                        },
                        {
                            path: 'Calendar',
                            name: 'Calendar',
                            component: Calendar,
                            props: true,
                            meta: {
                                requiresAuth: true,
                            },
                        },
                        {
                            path: 'Content',
                            name: 'Content',
                            component: Content,
                            props: true,
                            meta: {
                                requiresAuth: true,
                            },
                        },
                        {
                            path: 'ListMember',
                            name: 'Members',
                            component: ListMember,
                            props: true,
                            meta: {
                                requiresAuth: true,
                            },
                        },
                        {
                            path: 'Pending',
                            name: 'Pending',
                            component: Pending,
                            props: true,
                            meta: {
                                requiresAuth: true,
                            },
                        },
                        {
                            path: 'Settings',
                            name: 'Settings',
                            component: Settings,
                            props: true,
                            meta: {
                                requiresAuth: true,
                            },
                        },
                    ],
                    meta: {
                        requiresAuth: true,
                    },
                },

            ],
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    // const currentUser = firebase.currentUser();
    // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    // (requiresAuth && !currentUser) ? next('/login') :
    //   (!requiresAuth && currentUser) ? next('home') :
    next();
});
export default router;