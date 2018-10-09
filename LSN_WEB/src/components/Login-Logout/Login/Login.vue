<template>
  <b-container fluid class="bv-example-row bv-example-row-flex-cols color-background">
      <b-row  class=" text-center" >
        <b-col  class=" logo"> NTQ-LSN</b-col>
        <b-col md=12 class=" item-solution"> Solution</b-col>
        <b-col md=12 class=" p-4 mission"> {{mission}}</b-col>
        <b-col md=12 >
          <b-button variant="outline-primary" class="button" @click="login">Login</b-button>
          <p class="loading-icon" >
            <i v-if="iconLogin" class="fa fa-spinner fa-spin " style="font-size:35px"></i>
          </p>
        </b-col>
        <b-col md=12 class="about">
          About<span> Our</span>
        </b-col>
        <b-col md=12 class="icon">
          <b-container>
            <b-row class="text-center">
              <b-col offset="2" md="2"><i class="fa fa-address-book"></i><p>News</p> </b-col>
              <b-col md="2"><i class="fa fa-anchor"></i><p>Success</p></b-col>
              <b-col md="2"><i class="fa fa-ambulance"></i><p>Help</p></b-col>
              <b-col md="2"><i class="fa fa-envelope"></i><p>Support</p></b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col md=12 class="author">&#169; Project_Team_I</b-col>
      </b-row>
    <b-modal v-model="checkNotUser">
      {{message}}
    </b-modal>
  </b-container>
</template>
<script>
import firebase from '../../../firebase/firebase';
import cookie from '../../../services/cookie';
import api from '../../../services/api';

export default {
  data() {
    return {
      checkNotUser: false,
      iconLogin: false,
      message: '',
      mission: 'NTQ Solution is a Vietnamese software development company providing offshore development services such as mobile and web applications as well as other essential software services for businesses.',
    };
  },
  methods: {
    login() {
      this.loadingIcon(true);
      firebase
        .login()
        .then((result) => {
          if (result.user.email.indexOf('ntq-solution.com.vn') > -1) {
            const user = {
              email: result.user.email,
              fullName: result.user.displayName,
              avatar: result.user.photoURL,
            };
            this.postData(user);
          } else {
            this.loginFalse('Rất tiếc bạn không có quyền truy cập vào hệ thống! :(');
          }
        })
        .catch(() => {
          this.loginFalse('Đăng nhập thất bại! :(');
        },
        );
    },
    postData(user) {
      api
        .postAuth('/auth', user)
        .then((auth) => {
          localStorage.setItem('idUser', auth.idUser);
          cookie.setCookie('accessToken', auth.accessToken);
          this.directional();
        },
        );
    },
    loginFalse(e) {
      this.loadingIcon(false);
      this.checkNotUser = true;
      this.message = e;
      firebase.logout();
    },
    directional() {
      this.$router.replace('home');
    },
    loadingIcon(e) {
      this.iconLogin = e;
    },
  },
};
</script>
<style >
  @import "./styleLogin.css";
</style>
