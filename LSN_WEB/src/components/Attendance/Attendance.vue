<template>
  <div class="container wrapper">
    <div class="col-md-12 row">
      <div class="row">
        <div class="col-md-12 search">
          <form class="col-5">
            <input type="text" style="width: 250px" v-model="search"
               placeholder="Search Content" name="" class="form-control">
          </form>
        </div>
        <div class="col-md-12">
          <div class="list-attendance" v-for="(post,key) in filteredList">
            <div class="times">
              <h5 class="text-danger">Start : {{post.dateCreateContent}}</h5>
            </div>
            <div class="content">
              <span @click="showMemberAttendance(key)" style="cursor: pointer"
                data-toggle="modal" data-target="#attendance" class="text-primary">
                {{ post.nameContent }}
              </span>
              <span class="pl-1 pr-1"> - </span>
              <span class="date">at {{ post.time_attendance }}</span>
              <span class="toltalAttendance">
               {{ post.totalAttendance }} / {{ post.member }}
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="member">
      <MemberAttendance :id="id" ref="memberAttendance" :attendance="attendance"></MemberAttendance>
    </div>
  </div>
</template>
<script>
import MemberAttendance from './MemberAttendance';
import api from '../../services/api';

export default {
  props: ['id'],
  components: {
    MemberAttendance,
  },
  data() {
    return {
      search: '',
      attendances: [],
      attendance: false,
      idUser: '',
    };
  },
  computed: {
    filteredList() {
      return this.attendances.filter(attendance => attendance.nameContent.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  methods: {
    getList() {
      const params = {
        isApprove: true,
      };
      api
        .get(`/courses/${this.id}/attendance`, params)
        .then((attendances) => {
          this.attendances = attendances;
        });
    },
    showMemberAttendance(key) {
      if (this.attendances[key] && this.attendances[key].inforMemberAttendance) {
        this.$refs.memberAttendance.updateAttendance(this.attendances[key].inforMemberAttendance);
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style>
@import './style.css'
</style>
