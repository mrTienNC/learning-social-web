<template>
  <div class="container mt-3">
    <div class="row">
      <full-calendar  :events="events" :defaultView="defaultView"  @event-selected="showEvent" @day-click="showAddEvent" :config="config"></full-calendar>
      <Event :role="role" :isRole="isRole" :id="id" @editSuccsess="editSuccsess"
          @deleteSuccsess="deleteSuccsess" ref="event"></Event>
      <AddEvent @showAdd="addEvent" :id="id" v-bind:day="day"></AddEvent>
    </div>
    <div class="row">
      <EventHistory ref="showHistory"></EventHistory>
    </div>
    <Notification ref="alert" :message="message"></Notification>
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar';
import api from '../../services/api';
import { config } from '../../config/calendar';
import Notification from '../notification';
import Event from './Event';
import EventHistory from './EventHistory';
import getDate from '../../services/get-date';
import AddEvent from './AddEvent';
import role from '../../services/set-role';
import * as isRole from '../../config/role';

export default {
  props: ['id'],
  components: {
    FullCalendar,
    AddEvent,
    Event,
    Notification,
    EventHistory,
  },
  data() {
    return {
      idUser: parseInt(localStorage.getItem('idUser')),
      defaultView: 'month',
      role: '',
      isRole: '',
      day: '',
      today: '',
      message: '',
      events: [],
      eventActive: [],
      eventHistory: [],
      config: {
        height: 600,
        header: {
          left: 'prev,next',
          right: 'today',
          center: 'title',
        },
        locale: 'en',
      },
    };
  },
  methods: {
    getListEvent() {
      api
        .get(`/courses/${this.id}/events`)
        .then((events) => {
          this.events = events;
          this.filterEvent();
        });
    },
    filterEvent() {
      this.eventHistory = this.events.filter(content => content.start < this.today);
      this.$refs.showHistory.getEventHistory(this.eventHistory);
    },
    showEvent(event, jsEvent, view) {
      const temp = this.events.filter(content => content.event_id === event.event_id);
      this.eventActive = temp[0];
      this.$refs.event.changeEvents(this.eventActive);
      $('#event').modal('show');
    },
    showAddEvent(date) {
      this.day = getDate.formatDate(date);
      if (this.day < this.today) {
        this.message = 'Vui lòng chọn ngày lớn hơn';
        this.$refs.alert.show();
      } else if (this.role !== isRole.Admin) {
        this.message = 'Bạn không có quyền tạo Events';
        this.$refs.alert.show();
      } else {
        $('#addEvent').modal('show');
      }
    },
    addEvent() {
      this.getListEvent();
      this.message = 'Tạo sự kiện thành công';
      this.$refs.alert.show();
    },
    editSuccsess() {
      this.getListEvent();
      this.message = 'Cập nhật sự kiện thành công';
      this.$refs.alert.show();
    },
    deleteSuccsess(data) {
      this.getListEvent();
      this.message = 'Xoá sự kiện thành công';
      this.$refs.alert.show();
    },
    checkRole() {
      const params = {
        idCourse: this.id,
        idUser: this.idUser,
      };
      api
        .get('/course-member/checkRole', params)
        .then((dataRole) => {
          this.role = role.setRole(dataRole);
        });
    },
  },
  created() {
    this.getListEvent();
    this.today = getDate.getToday();
    this.checkRole();
    this.isRole = isRole;
  },
};
</script>
<style type="text/css">
@import './style.css'
</style>

