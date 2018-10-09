<template>
  <div>
    <div v-for="(data,index) in list">
      <!-- show less -->
      <div class="content-item" v-if="data.showAll === false">
        <div class="content-item-thumnail">
          <div class="author">
            <div class="author-img">
              <img :src="data.author.avatar" >
            </div>
            <div class="author-details">
              <h4 class="author-name mb-3">
                {{ data.author.fullName }}
              </h4>
              <div>Start: {{data.startDate}}</div>
              <div>End: {{data.endDate}}</div>
              <div>Level: {{data.level}} </div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div v-if="role === isRole.Admin || (data.author.id === idUser && role === isRole.User )">
            <div class="content-action">
              <i class="fa fa-ellipsis-v" data-toggle="dropdown" aria-hidden="true"></i>
              <div class="dropdown-menu" >
                <a @click="editContent(index,data.id)" data-toggle="modal"
                data-target=".bd-example-modal-lg" class="dropdown-item" href="#">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                   Edit</a>
                <a class="dropdown-item" href="#">
                  <i class="fa fa-times-circle" aria-hidden="true">
                  </i>
                  Delete</a>
             </div>
            </div>
          </div>
          <div class="content-name">
            {{data.title}}
          </div>
          <div class="content-descreption">
            <div v-if="data.content != null" v-html="data.content.substring(0,70)"></div>
            <div class="document">Link document : {{data.document}}</div>
          </div>
        </div>
        <div class="view-all float-right mt-3">
          <span class="text-primary" @click="data.showAll = !data.showAll">...View All</span>
        </div>
        <div class="attendance" v-if="role === isRole.Admin && data.endDate >= today">
          <button data-toggle="modal" @click="showAttendance(data.id)" data-target="#attendance"
          class="btn btn-primary text-white font-weight-bold">Take attendance</button>
        </div>
      </div>
      <div  class="content-item" v-else>
        <div class="content-item-thumnail style-2">
        </div>
        <div class="content-box style-2">
            <div v-if="role === isRole.Admin || (data.author.id === idUser && role === isRole.User )">
              <div class="content-action">
                <i class="fa fa-ellipsis-v" data-toggle="dropdown" aria-hidden="true"></i>
                <div class="dropdown-menu" >
                  <a @click="editContent(index,data.id)" data-toggle="modal"
                  data-target=".bd-example-modal-lg" class="dropdown-item" href="#">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                     Edit</a>
                  <a class="dropdown-item" href="#">
                    <i class="fa fa-times-circle" aria-hidden="true">
                    </i>
                    Delete</a>
               </div>
              </div>
            </div>
          <div class="content-name">
            {{data.title}}
          </div>
          <div class="author-details">
            <div class="item-author"><i class="fa fa-calendar mr-2" aria-hidden="true"></i>
              Start: {{data.startDate}}
            </div>
            <div class="item-author">
              <i class="fa fa-calendar-o mr-2" aria-hidden="true"></i>
              End: {{data.endDate}}
            </div>
            <div class="item-author">
              <i class="fa fa-level-up mr-2" aria-hidden="true"></i>
              Level: {{data.level}}
            </div>
            <div class="item-author">
              <i class="fa fa-user mr-2" aria-hidden="true"></i>
              Mentor: {{ data.author.fullName }}
            </div>
          </div>
          <div class="content-descreption" v-html="data.content">
          </div>
        </div>
        <div class="view-all float-right mt-3">
          <span class="text-primary" @click="data.showAll = !data.showAll">...View Less</span>
        </div>
        <div class="attendance" v-if="role === isRole.Admin && data.endDate >= today">
          <button @click="showAttendance(data.id)" data-toggle="modal" data-target="#attendance"
          class="btn btn-primary text-white font-weight-bold">Take attendance</button>
        </div>
      </div>
    <!-- show all -->
    </div>
    <infinite-loading spinner="circles" @infinite="infiniteHandler"></infinite-loading>
    <MemberAttendance ref="showAttendance" @addSuccess="attendanceSuccess" :id="id" :attendance="attendance"></MemberAttendance>
    <Notification ref="alert" :message="message"></Notification>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import MemberAttendance from '../Attendance/MemberAttendance';
import Notification from '../../components/notification';
import date from '../../services/get-date';
import * as isRole from '../../config/role';

export default {
  props: ['listContent', 'id', 'role', 'isRole'],
  components: {
    InfiniteLoading,
    MemberAttendance,
    Notification,
  },
  data() {
    return {
      list: [],
      keyEdit: '',
      attendance: true,
      idContent: '',
      message: '',
      today: '',
      idUser: parseInt(localStorage.getItem('idUser')),
    };
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length;
          i <= this.list.length + 2 && i < this.listContent.length; i++) {
          temp.push(this.listContent[i]);
        }
        this.list = this.list.concat(temp);
        if (this.listContent.length === this.list.length) {
          $state.complete();
        } else {
          $state.loaded();
        }
      }, 300);
    },
    editContent(key, id) {
      this.keyEdit = key;
      const data = this.list[key];
      this.$emit('editContent', data);
    },
    createContent(data) {
      this.list.unshift(data);
    },
    updateList(data) {
      const item = this.list[this.keyEdit];
      item.title = data.title;
      item.startDate = data.startDate;
      item.endDate = data.endDate;
      item.content = data.content;
      item.level = data.level;
    },
    showAttendance(idContent) {
      this.idContent = idContent;
      this.$refs.showAttendance.getListMember(this.idContent);
    },
    attendanceSuccess(data) {
      this.message = 'Điểm danh thành công';
      this.$refs.alert.show();
    },
  },
  created() {
    this.today = date.getToday();
  },
};

</script>
<style type="text/css">
  .infinite-status-prompt{
    display: none;
  }
</style>
