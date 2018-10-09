<template>
<div class="banner" :style="{ backgroundImage:'url('+courseDetails.thumbnail+')' }">
  <div class="container content-header">
    <div class="pick-background" v-if="role === isRole.Admin">
      <ChangeBanner  :id= "id" @changeBanner="change"></ChangeBanner>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="avatar-header" >
        <div class="avatar">
          <img class="avatar-thumnail" :src="courseDetails.avatar">
          <div v-if="role === isRole.Admin">
            <ChangeAvatar  :id = "id" @changeAvatar= "change"></ChangeAvatar>
          </div>
        </div>
        </div>
        <div class="group-name">
          <h4 class="group-title">{{ courseDetails.name }}</h4>
          <!-- StatusUser -->
          <StatusUser :id="id" :role="role" :idMemberCourse="idMemberCourse" :isApprove="isApprove" :isRole="isRole"></StatusUser>
        </div>
        <div class="col-md-3 float-right">
          <div class="descreption">
            {{ courseDetails.content }}
          </div>
        </div>
      </div>
      <div class="menu">
        <div class="menu-group">
          <ul class="nav-group" >
            <li class="nav-item" v-for="(nav,key) in menu">
            <router-link :to="{name: `${nav.name}`}"><span>{{nav.name}}</span></router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="content-body">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <router-view></router-view>
        </div>
        <div class="col-md-3 siderbar">
          <!-- AddMember -->
          <AddMember v-show="role === isRole.Admin || role === isRole.User" :id="id"></AddMember>
          <div class="siderbar-block mt-0">
            <div class="siderbar-header">
              <h4 class="siderbar-title">
                Group information
              </h4>
              <div  class="hr-block">
                <div class="hr"></div>
              </div>
            </div>
            <div class="siderbar-content">
              <div>{{ courseDetails.startDate }} - Now</div>
              <div class="text-danger">Creator: {{ courseDetails.fullName }}</div>
              <div>{{ courseDetails.member }} Members</div>
              <div>{{ courseDetails.event }} events</div>
            </div>
          </div>
          <div class="siderbar-block">
            <div class="siderbar-header">
              <h4 class="siderbar-title">
                Important Documents
              </h4>
              <div class="hr-block">
                <div class="hr"></div>
              </div>
            </div>
            <div class="siderbar-content">
              <InforDocuments :id="id"></InforDocuments>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import api from '../../services/api';
import AddMember from '../Member/AddMember/AddMember';
import StatusUser from '../PendingItem/StatusUser/StatusUser';
import ChangeAvatar from './ChangeAvatar';
import ChangeBanner from './ChangeBanner';
import InforDocuments from './InforDocuments';
import role from '../../services/set-role';
import EventBus from '../EventBus/EventBus';
import * as isRole from '../../config/role';

export default {
  props: ['id'],
  components: {
    AddMember,
    StatusUser,
    ChangeAvatar,
    ChangeBanner,
    InforDocuments,
  },
  data() {
    return {
      show: true,
      isRole: '',
      courseDetails: [],
      role: '',
      idMemberCourse: 0,
      isApprove: null,
      menu: [
        {
          name: 'Content',
          active: true,
        },
        {
          name: 'Attendance',
          active: false,
        },
        {
          name: 'Calendar',
          active: false,
        },
        {
          name: 'Members',
          active: false,
        },
        {
          name: 'Settings',
          active: false,
        },
        {
          name: 'Pending',
          active: false,
          pending: true,
        },
      ],
    };
  },
  methods: {
    getCourseDetails() {
      api
        .get(`/courses/${this.id}`)
        .then((courseDetails) => {
          this.courseDetails = courseDetails;
        });
    },
    change() {
      this.getCourseDetails();
    },
    checkRole() {
      const params = {
        idCourse: this.id,
        idUser: localStorage.getItem('idUser'),
      };
      api
        .get('/course-member/checkRole', params)
        .then((dataRole) => {
          this.role = role.setRole(dataRole);
          this.idMemberCourse = dataRole.id;
          if( dataRole.isApprove === false){
            this.isApprove = true
          } else {
            this.isApprove = false
          }
        });
    },
  },
  created() {
    this.getCourseDetails();
    this.checkRole();
    this.isRole = isRole;
    EventBus.$on('updateCourse', () => this.getCourseDetails());
    EventBus.$on('StatusUser', () => this.checkRole());
  },
};
</script>
<style>
@import './styleContent.css';
</style>
