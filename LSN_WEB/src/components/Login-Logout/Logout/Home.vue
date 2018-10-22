<template>
  <b-container fluid class="containerPage p-0">
       <b-navbar toggleable="md" type="dark" variant="info" class="navbar-header">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/home" class="logo">LSN</b-navbar-brand>
        <b-nav-form class="form_input">
          <b-form-input size="md" class="mr-md-5" type="text" placeholder="Search"/>

        </b-nav-form>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
         <b-navbar-brand href="#">Profile</b-navbar-brand>
         <b-navbar-brand href="/home">Home</b-navbar-brand>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em><span class="caret"></span></em>
            </template>
            <b-dropdown-item href="#">Setting</b-dropdown-item>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
    <!-- <div class="row">
      <div class="col-md-3 sidebar">
        <leftbar></leftbar>
      </div>
      <div class="col-md-6 content">

      </div>
      <div class="col-md-3 rightbar">
        <rightbar></rightbar>
      </div>
    </div> -->
  </b-container>
</template>
<script>
import api from "../../../services/api";
import firebase from "../../../firebase/firebase";
import cookie from "../../../services/cookie";
import Layout from "../Layout/Layout.vue";
import Leftbar from "../Leftbar/Leftbar.vue";
import Rightbar from "../Rightbar/Rightbar.vue";
import Timeline from "../Timeline/Timeline.vue";

export default {
  components: {
    Layout,
    Leftbar,
    Rightbar
  },
  data() {
    return {
      user: "",
      data: [],
      subMenu: false,
      layoutCheck: true
    };
  },
  methods: {
    profile() {},
    logout() {
      api.post("/logout" + localStorage.getItem("token"));
      this.deleteTokenInCookie();
      this.routerLinkHome();
    },
    deleteTokenInCookie() {
      localStorage.clear();
      cookie.deleteCookie("token");
    },
    routerLinkHome() {
      this.$router.replace("/");
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Cabin|K2D|Open+Sans");
@import "./styleHome.css";
</style>
