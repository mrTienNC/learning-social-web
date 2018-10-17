<template>
  <div class="course-page">
    <div class="container">
      <div class="row group-header">
        <div class="col-md-12 text-center mb-5">
          <h4 class="group-name-title">List Course</h4>
          <button class="btn btn-outline-danger btn-add-group"
          data-toggle="modal" data-target="#exampleModal">
          Add new Course
        </button>
      </div>
      </div>
      <div class="row group-body mt-4">
        <!-- Start Group -->
        <div class="col-md-4 mb-3" v-for="(data,key) in courses" :key="key">
          <div class="card">
            <div class="card-header group-name text-primary">
              <router-link :to="{name: 'Content', params: {id: data.id} }">
                {{ data.name }}
              </router-link>
            </div>
            <div class="card-body p-0 mt-2">
              <ul class="list-group-icons" style="padding:10px ; padding-bottom: 0px;">
                <li class="group-icon-item">
                  <i class="fa fa-user icon-item" aria-hidden="true"></i>
                  <span class="list-group-text">{{ data.member }} members</span>
                </li>
                <li class="group-icon-item">
                  <i class="fa fa-star-o icon-item" aria-hidden="true"></i>
                  <span class="list-group-text">Creator: {{ data.fullName }}</span>
                </li>
                <li class="group-icon-item">
                  <i class="fa fa-pencil icon-item" aria-hidden="true"></i>
                  <span class="list-group-text">{{ data.event }} events</span>
                </li>
                <li class="group-icon-item">
                  <i class="fa fa-calendar icon-item" aria-hidden="true"></i>
                  <span class="list-group-text">Start date: {{ data.startDate }}</span>
                </li>
              </ul>
            </div>
            <div class="card-footer group-content mt-2">
              {{ data.content }}
            </div>
          </div>
        </div>
        <!-- End Group -->
        </div>
        <!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="exampleModal">
          <CreatCourse v-on:create="createCourse"></CreatCourse>
        </div>
        <!-- end modal -->
    </div>
     <Notification ref="alert" :message="message"></Notification>
  </div>
</template>
<script>
import CreatCourse from "./creatCourse";
import Notification from "../notification";
import api from "../../services/api";
import "../../../node_modules/jquery-validation/dist/jquery.validate";

export default {
  components: {
    Notification,
    CreatCourse
  },
  data() {
    return {
      courses: [],
      today: "",
      message: " "
    };
  },
  methods: {
    // getCourse() {
    //   api
    //     .get('/courses')
    //     .then((courses) => {
    //       this.courses = courses.reverse();
    //     });
    // },
    // createCourse(value, message) {
    //   this.courses.unshift(value);
    //   this.message = message;
    //   this.$refs.alert.show();
    // },
  }
  // created() {
  //   this.getCourse();
  // },
};
</script>
<style scoped>
@import "./style.css";
</style>
