<template>
  <b-container>
    <b-row>
      <b-col md="6" class="p-1" v-for="(item,key) in dataMember" :key='key'>
        <b-card>
          <b-media>
            <b-img id="formatImg"  v-bind:src="item.user.avatar" slot="aside" alt="placeholder" />
            <h5 class="mt-0 captain" v-if="item.isCaptain">{{item.user.fullName}}</h5>
            <h5 class="mt-0 user" v-if="!item.isCaptain">{{item.user.fullName}}
              <span v-show="role === 'ADMIN'">
                <b-dropdown class="m-0 FloatRight" variant="link">
                  <b-dropdown-item @click="remove(item.id)" >Remove</b-dropdown-item>
                  <b-dropdown-item @click="setCaptian(item.id)">Add Admin</b-dropdown-item>
                </b-dropdown>
              </span>
            </h5>
            <p>
              <b>Date join:</b> {{new Date(item.joinDate).toDateString()}}
            </p>
            <p id="sizeGmailSkype">
              <b>Gmail:</b>{{item.user.email}}
            </p>
            <p id="sizeGmailSkype">
              <b>Skype:</b>{{item.user.email}}
            </p>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
    <Notification ref="alert" :message="message"></Notification>
  </b-container>
</template>
<script>
import api from '../../../services/api';
import EventBus from '../../EventBus/EventBus';
import role from '../../../services/set-role';
import Notification from '../../notification';

export default {
  props: ['id'],
  components: {
    Notification,
  },
  data() {
    return {
      dataMember: [],
      idDelete: 0,
      idUserInCourse: 0,
      role: '',
      message: '',
    };
  },
  created() {
    this.getListMember();
    EventBus.$on('updateMembers', () => this.getListMember());
  },
  methods: {
    getListMember() {
      const approved = { isApprove: true };
      api.get(`/courses/${this.id}/course-members`, approved)
        .then((e) => {
          this.dataMember = e;
          this.checkRoleUser();
        },
        );
    },
    checkRoleUser() {
      const params = {
        idCourse: this.id,
        idUser: localStorage.getItem('idUser'),
      };
      api
        .get('/course-member/checkRole', params)
        .then(dataRole => this.role = role.setRole(dataRole));
    },
    alert(e) {
      if (e.data === null) {
        this.message = 'Bạn đã xóa thành công 1 thành viên!';
      } else {
        this.message = 'Bạn đã chuyển quyền 1 thành viên thành Admin!';
      }
      this.$refs.alert.show();
    },
    setCaptian(id) {
      const putRoleMember = JSON.stringify({ isCaptain: 'true' });
      api
        .put(`/course/${this.id}/setRoleMember/${id}`, putRoleMember)
        .then((e) => {
          this.getListMember();
          this.alert(e);
          EventBus.$emit('StatusUser');
        });
    },
    remove(id) {
      api
        .delete(`/courses/${this.id}/course-members/${id}`)
        .then((e) => {
          this.getListMember();
          this.alert(e);
        });
    },
  },
};
</script>
<style scoped>
@import './styleListMember.css';
</style>
