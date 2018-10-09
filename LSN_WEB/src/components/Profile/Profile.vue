<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-12">
            <img :src="user.avatar" class="col-md-12">
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <ul class="list-group">
          <li class="list-group-item">
            <h4>{{user.fullName}} </h4>
          </li>
          <li class="list-group-item">
            <div class="row input-group">
              <label  class="col-md-12 showIcon">Birthday: {{user.dateOfBirth}}
                <span class="icon">
                  <i @click="validateBirthday" v-if="!checkBirthday  " class="fa fa-pencil ml-2"
                  aria-hidden="true">
                </i>
              </span>
            </label>
            <div class="row col-md-12 ml-5" v-if="checkBirthday">
              <input  type="date" v-model="user.dateOfBirth" class="col-md-6 form-control">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="saveBirthday" >save</button>
                <button class="btn btn-outline-secondary"  @click="caneData">cane</button>
              </div>
            </div>
          </div>
          <li class="list-group-item">
            <label>Email:
            </label> {{user.email}}
          </li>
          <li class="list-group-item">
            <div class="row input-group">
              <label class="col-md-12 showIcon">Skype: {{user.skype}}
                <span  class="icon">
                  <i
                  @click="validateSkype"
                  v-if="!checkSkype"
                  class="fa ml-2 fa-pencil" aria-hidden="true">
                </i>
              </span>
            </label>
            <div class="row col-md-12 ml-5 " v-if="checkSkype">
              <input type="text" v-model="user.skype" class="col-md-6 form-control">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="saveSkype"  >save</button>
                <button @click="caneData" class="btn btn-outline-secondary">cane</button>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <label>Join date:</label> {{user.dateJoinSystem}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import api from '../../services/api';
import date from '../../services/get-date';

export default{
  data() {
    return {
      user: [],
      checkBirthday: false,
      checkSkype: false,
      idUser: localStorage.getItem('idUser'),
    };
  },
  methods: {
    caneData() {
      this.checkBirthday = this.checkSkype = false;
      this.getData();
    },
    saveBirthday() {
      const params = {
        dateOfBirth: this.user.dateOfBirth,
        skype: this.user.skype,
      };
      api
        .put(`/users/${this.idUser}`, params)
        .then((res) => {
          this.checkBirthday = false;
          this.getData();
        });
    },
    saveSkype() {
      const params = {
        dateOfBirth: this.user.dateOfBirth,
        skype: this.user.skype,
      };
      api
        .put(`/users/${this.idUser}`, params)
        .then((res) => {
          this.checkSkype = false;
          this.getData();
        });
    },
    validateSkype() {
      if (this.checkBirthday) {
        this.checkBirthday = !this.checkBirthday;
        this.checkSkype = !this.checkSkype;
      } else {
        this.checkSkype = !this.checkSkype;
      }
    },
    validateBirthday() {
      if (this.checkSkype) {
        this.checkBirthday = !this.checkBirthday;
        this.checkSkype = !this.checkSkype;
      } else {
        this.checkBirthday = !this.checkBirthday;
      }
    },
    getData() {
      api
        .get('/profile')
        .then((user) => {
          this.user = user;
          this.user.dateOfBirth = date.formatDate(this.user.dateOfBirth);
          this.user.dateJoinSystem = date.formatDate(this.user.dateJoinSystem);
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style type="text/css" scoped>
.fa {
  display: none;
}
.showIcon:hover .fa {
  display: inline-block;
}
.fa:hover{
  color: red;
}
img {
  height: 90%;
}
.icon {
 cursor: pointer;
}
</style>
