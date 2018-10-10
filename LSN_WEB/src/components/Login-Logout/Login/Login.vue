<template>
   <b-container fluid class="bv-example-row bv-example-row-flex-cols color-background">
    <b-row class="login-container">
       <b-container>
        <b-row>
            <b-col md=6 >
              <a href="/" class="header-logo">LSN</a>
            </b-col>
              <b-col md=5 >
                <b-row style="margin-top : 0.5em; align-item : center;">
                  <b-col md=6>
                    <span class="email">Email</span> <input type="email" v-model="email">
                  </b-col>
                  <b-col md=6>
                    <span class="password">Password</span> <input type="password" v-model="password">
                  </b-col>
                </b-row>
              </b-col>
            <b-col md=1 >
              <b-button variant="outline-primary" class="button" @click="login">Login</b-button>
              <p class="loading-icon" >
                <i v-if="iconLogin" class="fa fa-spinner fa-spin " style="font-size:35px"></i>
              </p>
            </b-col>
        </b-row>
       </b-container>
    </b-row>
     <b-container>
        <b-row  class=" text-left" >
          <b-col md="6">
            <b-container class="presentation">
              <b-row>
                <b-row class=" logo">Learning Social Network</b-row>
                <b-row><img src="../../../assets/presentation.png" alt="presentation"></b-row>
                <!-- <p class="p-4 mission">{{mission}}</p> -->
              </b-row>
            </b-container>
          </b-col>
          <b-col md="6">
            <b-container class="registration">
              <b-row class="registry-text">
               <b-col md=3>
                 <h2>Registry</h2>
                 <p>Free for everyone</p>
               </b-col>
              </b-row>
              <b-row class="registry-name">
               <b-col md=5>
                 <input type="text" v-model="firstName" placeholder="First Name">
               </b-col>
               <b-col md=5 offset=1>
                  <input type="text" v-model="lastName" placeholder="Last Name">
               </b-col>
              </b-row>
              <b-row class="registry-email">
                <b-col md=12><input type="email" v-model="emailRegistry" placeholder="Email"></b-col>
              </b-row>
              <b-row class="registry-password">
                <b-col md=12><input type="password" v-model="passwordRegistry" placeholder="Password"></b-col>
              </b-row>
              <b-row class="registry-birthday">
                <b-col md=12><input type="date"></b-col>
              </b-row>
              <b-row class="registry-gender">
                <b-col md=12>
                  <b-form-radio-group id="gender" v-model="gender" name="gender" plain>
                    <b-form-radio value="1">Male</b-form-radio>
                    <b-form-radio value="2">Female</b-form-radio>
                  </b-form-radio-group>
                </b-col>
              </b-row>
              <b-row class="registry-button">
                <b-col md=12>
                  <b-button variant="success" @click="registry">Registration</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
     </b-container>
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
      mission: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
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
  @import url('https://fonts.googleapis.com/css?family=Cabin|K2D|Open+Sans');
  @import "./styleLogin.css";
</style>
