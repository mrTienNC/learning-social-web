<template>
  <b-container fluid class="containerPage p-0">
    <b-navbar class="sticky" id="zIndexMenu" toggleable="xl" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#" class="p-0">
        <router-link id="logo" :to="{name : 'home'}">
          <span @click="layoutCheck = true">
            <i class="fa fa-home"></i> NTQ-LSN
          </span>
        </router-link>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown @click="getCourse" text="My course" class="list-group">
            <b-dropdown-item href="#" v-for="(data,key) in orderBy(dataClass, 'name') " :key="key">
              <router-link to="{name: 'Content', params:{id: data.id}}">
                <span @click="layoutCheck = false">{{data.name}}</span>
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item id="option" href="#">Help</b-nav-item>
          <b-nav-item id="option" href="#">Contact</b-nav-item>
          <b-nav-item id="option" href="#">FAQ</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-1" id="input" type="text" />
            <b-button size="sm"  class="my my-sm-0" type="button">Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown class="user" >
            <template slot="button-content" >
              <span><img id="avatar" v-bind:src= "user.photoURL"></span>
              <span id="user">{{user.displayName}}</span>
            </template>
            <b-dropdown-item href="#" >
                <router-link :to="{name : 'home'}" class="routerLink">
                  <span @click="layoutCheck = true"><i class="fa fa-home"></i> Home</span>
                </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{name : 'ListCourse'}" class="routerLink">
                <span @click="layoutCheck = false"><i class="fa fa-list"></i> List course of LSN</span>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{name : 'Profile'}" class="routerLink">
                <span @click="layoutCheck = false"><i class="fa fa-user"></i> View Profile</span>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="logout" class="routerLink">
              <i class="fa fa-sign-out" ></i> Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
    <Layout :layoutCheck="layoutCheck" v-on:TurnOff="layoutCheck = $event"></Layout>
  </b-container>
</template>
<script>
import api from '../../../services/api';
import firebase from '../../../firebase/firebase';
import cookie from '../../../services/cookie';
import Layout from '../Layout/Layout.vue';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      user: '',
      dataClass: [],
      subMenu: false,
      layoutCheck: false,
    };
  },
  created() {
    const currentUser = firebase.currentUser();
    const accessToken = cookie.getCookie('accessToken');
    if (currentUser && accessToken) {
      this.user = currentUser;
    } else if (currentUser && !accessToken) {
      this.logout();
    }
    this.getCourse();
    if (this.$router.history.current.path === '/home') {
      this.layoutCheck = true;
    }
  },
  methods: {
    logout() {
      firebase
        .logout()
        .then(() => {
          api.post('/logout');
          this.deleteTokenInCookie();
          this.routerLinkHome();
        },
        );
    },
    getCourse() {
      api
        .get('/courses-user-active')
        .then((e) => {
          this.dataClass = e;
        });
    },
    deleteTokenInCookie() {
      localStorage.clear();
      cookie.deleteCookie('accessToken');
    },
    routerLinkHome() {
      this.$router.replace('/');
    },
  },
};
</script>
<style scoped>
@import './styleHome.css';

</style>
